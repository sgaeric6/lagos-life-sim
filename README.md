# Lagos Life Sim 🌍

A realistic multiplayer life-simulation and social game set in Lagos, Nigeria. Players create a character, explore city districts, make friends, earn money, study, travel, place bets, and build an empire.

## Project status

This project now includes:

- Frontend landing page and city-life dashboard
- Character creator and travel-screen flow
- Social interaction and live chat prototype
- Betting and wallet panel
- Real-time backend foundation with Socket.io
- API routes for game data and health checks
- Full-stack starter structure for further expansion

## Stack

- Frontend: Next.js + React + Tailwind CSS
- Real-time: Socket.io
- Backend: Node.js + Express
- Database: PostgreSQL-ready structure
- Environment: Node + dotenv

## Run locally

```bash
npm install
npm run dev
```

This will start:
- the Next.js frontend on http://localhost:3000
- the Express + Socket.io backend on http://localhost:4000

## Included features

- Welcome screen
- Character creation workflow
- Lagos map and travels
- Nearby players and social actions
- Chat and photo upload UI
- Betting panel with odds and payouts
- Daily life and economy cards
- Real-time backend routes for future multiplayer systems

## Folder overview

```text
lagos-life-sim/
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── backend/
│   └── src/
│       ├── server.js
│       └── gameData.js
├── public/
│   └── lagos-skyline.svg
├── .env.example
├── package.json
├── README.md
└── next.config.mjs
```

## Next major features to build

- Real PostgreSQL database models
- User auth and player saves
- Real-time multiplayer chat rooms
- Property and business ownership system
- Health, energy, and education states
- More advanced 3D environment with Three.js
- Matchmaking and social events
- Secure betting backend and settlement logic
