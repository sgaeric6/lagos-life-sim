const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

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

const districts = [
  'Victoria Island',
  'Lekki',
  'Ikoyi',
  'Yaba',
  'Surulere',
  'Ikeja',
  'Ajah',
  'Airport',
  'Beach',
  'Mall'
];

const players = [
  { id: 'p1', name: 'Ada C.', district: 'Victoria Island', status: 'Nearby', mood: 'Coffee meetup' },
  { id: 'p2', name: 'Kunle B.', district: 'Yaba', status: 'Gym', mood: 'Flowing energy' },
  { id: 'p3', name: 'Zainab T.', district: 'Lekki', status: 'Mall', mood: 'Shopping' }
];

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'lagos-life-sim-backend',
    time: new Date().toISOString(),
    onlinePlayers: players.length,
    districts: districts.length
  });
});

app.get('/api/game', (req, res) => {
  res.json({
    districts,
    players,
    economy: {
      balance: 1250000,
      incomePerDay: 24000,
      businessValue: 10500000,
      energy: 82,
      health: 91
    },
    bets: [
      { label: 'Match winner', odds: 2.4 },
      { label: 'Daily hustle', odds: 1.9 },
      { label: 'Beach meetup', odds: 3.1 },
      { label: 'Property flip', odds: 4.2 }
    ]
  });
});

io.on('connection', (socket) => {
  console.log('New socket connected:', socket.id);

  socket.emit('welcome', {
    message: 'Welcome to Lagos Life Sim',
    onlinePlayers: players.length
  });

  socket.on('chat:send', ({ user, text }) => {
    io.emit('chat:message', {
      user,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tone: 'them'
    });
  });

  socket.on('social:action', ({ action, target }) => {
    io.emit('social:event', {
      action,
      target,
      time: new Date().toISOString()
    });
  });

  socket.on('bet:place', ({ amount, odds, label }) => {
    const potentialWin = Math.round(amount * odds);
    io.emit('bet:result', {
      label,
      amount,
      potentialWin,
      result: Math.random() > 0.45 ? 'win' : 'loss'
    });
  });
});

const PORT = Number(process.env.PORT || 4000);
server.listen(PORT, () => {
  console.log(`Lagos Life Sim backend running on http://localhost:${PORT}`);
});
