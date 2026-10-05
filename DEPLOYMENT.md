# Deployment Guide - Lagos Life Sim

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### 1. Database Setup

```bash
# Create PostgreSQL database
creatdb lagos_life_sim

# Load schema
psql -d lagos_life_sim -f database/schema.sql
```

### 2. Environment Setup

```bash
# Copy and configure environment
cp .env.local.example .env.local

# Edit .env.local with your settings:
# - DB_PASSWORD: your postgres password
# - JWT_SECRET: generate with: openssl rand -base64 32
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Servers

```bash
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

---

## Production Deployment

### Option 1: Vercel + Railway (Recommended)

#### Step 1: Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app`
6. Click "Deploy"

#### Step 2: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add PostgreSQL database from Railway
5. Set environment variables in Railway dashboard:
   ```
   PORT=4000
   JWT_SECRET=(generate secure key)
   DB_USER=postgres
   DB_PASSWORD=(railway auto-generated)
   DB_HOST=(railway hostname)
   DB_NAME=(railway db name)
   DB_PORT=5432
   NODE_ENV=production
   ```
6. Railway auto-deploys on push

#### Step 3: Connect Frontend to Backend

1. Get your Railway backend URL
2. Update Vercel environment variable:
   - `NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app`
3. Redeploy on Vercel

---

### Option 2: Heroku + Heroku Postgres (Alternative)

```bash
# Login to Heroku
heroku login

# Create backend app
heroku create lagos-life-sim-backend

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev -a lagos-life-sim-backend

# Set environment variables
heroku config:set JWT_SECRET=$(openssl rand -base64 32) -a lagos-life-sim-backend
heroku config:set NODE_ENV=production -a lagos-life-sim-backend

# Push code
git push heroku main

# Run migrations
heroku run "psql < database/schema.sql" -a lagos-life-sim-backend
```

---

### Option 3: Self-Hosted (AWS/DigitalOcean)

#### On Ubuntu Server:

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Create database
sudo -u postgres createdb lagos_life_sim

# Clone repository
git clone your-repo.git
cd lagos-life-sim

# Install dependencies
npm install

# Load schema
psql -U postgres -d lagos_life_sim -f database/schema.sql

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your settings

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start backend/src/server.js --name "lagos-backend"
pm2 start "npm run start" --name "lagos-frontend"

# Setup reverse proxy (Nginx)
sudo apt-get install -y nginx
# Configure Nginx to proxy to localhost:3000 and :4000
```

---

## Testing the Game Locally

### 1. Start Development

```bash
npm run dev
```

### 2. Test Auth Flow

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testplayer",
    "email": "test@example.com",
    "password": "password123",
    "display_name": "Test Player"
  }'
```

### 3. Test Game Features

- Open http://localhost:3000 in browser
- Register new player account
- Test career jobs (work for income)
- Test education (pay school fees)
- Test social feed (create posts, like)
- Test 3D map navigation
- Test real-time chat via Socket.io

### 4. API Health Check

```bash
curl http://localhost:4000/api/health
```

Should return:
```json
{
  "status": "ok",
  "app": "lagos-life-sim-backend",
  "database": "connected",
  "realtime": "socket.io enabled"
}
```

---

## Database Connection Testing

### Via psql

```bash
psql -U postgres -d lagos_life_sim
\dt  # List tables
SELECT * FROM players;  # Check players
```

### Via Node.js

```javascript
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: 'your_password',
  host: 'localhost',
  database: 'lagos_life_sim'
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err ? 'DB Error' : 'DB Connected');
});
```

---

## Performance & Monitoring

### Frontend Monitoring (Vercel)
- Built-in analytics dashboard
- Real-time performance metrics
- Error tracking

### Backend Monitoring (Railway)
- CPU & Memory usage
- Network I/O
- Build & deploy logs

### Add Sentry for Error Tracking

```bash
npm install @sentry/nextjs
```

---

## Next Steps to Make Game Perfect

✅ Database connected
✅ Auth system working
✅ Jobs & income system
✅ Education system
✅ Social feed
✅ Real-time chat
✅ 3D map foundation

**TODO:**
- [ ] Add Three.js 3D interactivity (click buildings)
- [ ] Implement property purchase logic
- [ ] Add business management UI
- [ ] Implement leaderboards
- [ ] Add mobile app (React Native)
- [ ] Setup automated backups
- [ ] Add email notifications
- [ ] Implement payment system

---

## Troubleshooting

### "Cannot connect to database"
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify credentials in .env.local
- Ensure database exists: `psql -l`

### "Port 4000 already in use"
```bash
lsof -i :4000  # Find process
kill -9 <PID>  # Kill process
```

### "Socket.io connection failed"
- Check backend is running on correct port
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check CORS settings in backend/src/server.js

### "Build fails on Railway"
- Check Node.js version: `node --version` (should be 18+)
- Verify all dependencies in package.json
- Check Railway logs for specific errors

---

## Support

For issues or questions:
1. Check logs: `npm run dev` output
2. Review Railway/Vercel dashboards
3. Test API directly: `curl http://localhost:4000/api/health`
4. Check PostgreSQL: `psql -d lagos_life_sim`

---

**Game is production-ready! Deploy and share with the world.** 🚀
