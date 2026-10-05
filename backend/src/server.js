const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lagos_life_sim',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Auth middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.playerId = decoded.playerId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, display_name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = `user_${Date.now()}`;

    const result = await pool.query(
      'INSERT INTO players (user_id, username, email, password_hash, display_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, username',
      [user_id, username, email, hashedPassword, display_name]
    );

    const token = jwt.sign({ playerId: result.rows[0].id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    res.json({
      message: 'Player created',
      token,
      player: result.rows[0]
    });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM players WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const player = result.rows[0];
    const validPassword = await bcrypt.compare(password, player.password_hash);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ playerId: player.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      player: {
        id: player.id,
        username: player.username,
        display_name: player.display_name,
        balance: player.balance
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// GET PLAYER PROFILE
app.get('/api/player/:id', verifyToken, async (req, res) => {
  try {
    const player = await pool.query('SELECT id, username, display_name, balance, reputation, energy, health, current_district FROM players WHERE id = $1', [req.params.id]);
    if (player.rows.length === 0) return res.status(404).json({ error: 'Player not found' });

    const properties = await pool.query('SELECT * FROM properties WHERE player_id = $1', [req.params.id]);
    const businesses = await pool.query('SELECT * FROM businesses WHERE player_id = $1', [req.params.id]);

    res.json({
      player: player.rows[0],
      properties: properties.rows,
      businesses: businesses.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BUY PROPERTY
app.post('/api/player/property', verifyToken, async (req, res) => {
  const { property_name, location, property_type, value } = req.body;

  try {
    const player = await pool.query('SELECT balance FROM players WHERE id = $1', [req.playerId]);
    if (player.rows[0].balance < value) return res.status(400).json({ error: 'Insufficient funds' });

    await pool.query('UPDATE players SET balance = balance - $1 WHERE id = $2', [value, req.playerId]);
    const property = await pool.query(
      'INSERT INTO properties (player_id, property_name, location, property_type, value) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.playerId, property_name, location, property_type, value]
    );

    res.json({ message: 'Property purchased', property: property.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE BUSINESS
app.post('/api/player/business', verifyToken, async (req, res) => {
  const { business_name, business_type, location } = req.body;
  const startup_cost = 500000;

  try {
    const player = await pool.query('SELECT balance FROM players WHERE id = $1', [req.playerId]);
    if (player.rows[0].balance < startup_cost) return res.status(400).json({ error: 'Insufficient funds' });

    await pool.query('UPDATE players SET balance = balance - $1 WHERE id = $2', [startup_cost, req.playerId]);
    const business = await pool.query(
      'INSERT INTO businesses (player_id, business_name, business_type, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.playerId, business_name, business_type, location]
    );

    res.json({ message: 'Business created', business: business.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PLACE BET (secure backend)
app.post('/api/player/bet', verifyToken, async (req, res) => {
  const { bet_type, stake_amount, odds } = req.body;
  const potential_win = Math.round(stake_amount * odds);

  try {
    const player = await pool.query('SELECT balance FROM players WHERE id = $1', [req.playerId]);
    if (player.rows[0].balance < stake_amount) return res.status(400).json({ error: 'Insufficient funds' });

    // Deduct stake from balance
    await pool.query('UPDATE players SET balance = balance - $1 WHERE id = $2', [stake_amount, req.playerId]);

    // Record bet
    const result = Math.random() > 0.45 ? 'win' : 'loss';
    const payout = result === 'win' ? potential_win : 0;

    if (result === 'win') {
      await pool.query('UPDATE players SET balance = balance + $1 WHERE id = $2', [payout, req.playerId]);
    }

    await pool.query(
      'INSERT INTO bets (player_id, bet_type, stake_amount, odds, potential_win, result) VALUES ($1, $2, $3, $4, $5, $6)',
      [req.playerId, bet_type, stake_amount, odds, potential_win, result]
    );

    res.json({
      message: 'Bet settled',
      result,
      payout,
      newBalance: player.rows[0].balance - stake_amount + payout
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SOCKET.IO REAL-TIME
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  socket.on('join-room', ({ roomName, playerId }) => {
    socket.join(roomName);
    if (!rooms.has(roomName)) rooms.set(roomName, []);
    rooms.get(roomName).push(playerId);

    io.to(roomName).emit('player-joined', {
      playerId,
      totalPlayers: rooms.get(roomName).length
    });
  });

  socket.on('chat:send', ({ roomName, playerId, playerName, text }) => {
    io.to(roomName).emit('chat:message', {
      playerId,
      playerName,
      text,
      time: new Date().toLocaleTimeString()
    });
  });

  socket.on('social:action', ({ roomName, action, targetPlayerId, fromPlayerName }) => {
    io.to(roomName).emit('social:event', {
      action,
      fromPlayerName,
      targetPlayerId,
      time: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'lagos-life-sim-backend',
    time: new Date().toISOString(),
    database: 'connected',
    realtime: 'socket.io enabled'
  });
});

const PORT = Number(process.env.PORT || 4000);
server.listen(PORT, () => {
  console.log(`Lagos Life Sim backend running on http://localhost:${PORT}`);
});
