import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'lagos-life-sim-api',
    timestamp: new Date().toISOString(),
    message: 'Lagos Life Sim API is running.'
  });
}
