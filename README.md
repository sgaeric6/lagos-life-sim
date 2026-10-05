# Lagos Life Sim - Production Ready 🎮

A realistic multiplayer life-simulation game set in Lagos, Nigeria with full-stack authentication, database persistence, real-time chat, property/business systems, and secure betting.

## Features Included

### 🔐 Authentication & Accounts
- User registration and login with JWT tokens
- Password hashing with bcryptjs
- Secure token-based authentication
- Player profile persistence

### 🏠 Property & Business Systems
- Buy and own residential properties
- Create and manage businesses
- Track property values and rental income
- Business revenue and employee management
- Economy progression and wealth building

### 💬 Real-Time Multiplayer
- Socket.io powered live chat rooms
- District-based multiplayer rooms
- Social interactions (Wave, Flirt, Kiss, Gift, Invite)
- Real-time player presence and notifications
- Message history and user interactions

### 💰 Secure Betting System
- Server-side bet validation
- Odds calculation and payout settlement
- Player balance management
- Bet history tracking
- Anti-cheating backend validation

### 🗺️ 3D City Map (Ready for Three.js)
- Multi-district Lagos environment
- District-based navigation
- Travel and location tracking
- Foundation for 3D rendering

### 📊 Database Backend
- PostgreSQL with full schema
- Player profiles and statistics
- Property and business ownership
- Transaction history
- Social connections and friendships

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### 2. Database Setup

```bash
# Create database
creatdb lagos_life_sim

# Load schema
psql -d lagos_life_sim -f database/schema.sql
```

### 3. Environment Configuration

```bash
# Copy environment file
cp .env.local.example .env.local

# Edit .env.local with your settings
# - DB_PASSWORD: your postgres password
# - JWT_SECRET: a secure random string
# - API URLs and ports
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new player account
- `POST /api/auth/login` - Login and get JWT token

### Player
- `GET /api/player/:id` - Get player profile and assets
- `POST /api/player/property` - Purchase property
- `POST /api/player/business` - Create business
- `POST /api/player/bet` - Place bet (server-validated)

### Real-Time (Socket.io)
- `join-room` - Join multiplayer chat room
- `chat:send` - Send message to room
- `social:action` - Perform social interaction
- `player-joined` - Receive player join events

## Project Structure

```
lagos-life-sim/
├── app/
│   ├── game.tsx          # Main game UI component
│   ├── layout.tsx        # App layout
│   ├── globals.css       # Tailwind styles
│   └── api/              # Next.js API routes
├── backend/
│   └── src/
│       └── server.js     # Express + Socket.io server
├── database/
│   └── schema.sql        # PostgreSQL schema
├── .env.local.example    # Environment template
├── package.json          # Dependencies
└── README.md             # This file
```

## Key Technologies

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Express.js, Socket.io
- **Database**: PostgreSQL
- **Auth**: JWT + bcryptjs
- **Real-time**: Socket.io
- **Ready for**: Three.js (3D rendering)

## Next Phase Build Items

- [ ] Three.js 3D city rendering
- [ ] Advanced property customization
- [ ] NPC AI and quest systems
- [ ] Event matchmaking and social groups
- [ ] Mobile app (React Native)
- [ ] Payment integration
- [ ] Leaderboards and achievements
- [ ] Voice chat integration

## Deployment

Ready to deploy to:
- Frontend: Vercel, Netlify
- Backend: Railway, Render, Heroku
- Database: AWS RDS, Supabase, neon.tech

## License

MIT
