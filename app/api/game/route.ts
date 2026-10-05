import { NextResponse } from 'next/server';

const mockGame = {
  districts: [
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
  ],
  players: [
    { id: 'p1', name: 'Ada C.', district: 'Victoria Island', status: 'Nearby', mood: 'Coffee meetup' },
    { id: 'p2', name: 'Kunle B.', district: 'Yaba', status: 'Gym', mood: 'Freshly worked out' },
    { id: 'p3', name: 'Zainab T.', district: 'Lekki', status: 'Mall', mood: 'Shopping' }
  ],
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
};

export async function GET() {
  return NextResponse.json(mockGame);
}
