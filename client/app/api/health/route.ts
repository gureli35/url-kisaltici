import { NextResponse } from 'next/server';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { testConnection } = require('../../../config/db');

export async function GET() {
  try {
    await testConnection();
    return NextResponse.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'Connected'
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      status: 'Error', 
      timestamp: new Date().toISOString(),
      database: 'Disconnected',
      error: errorMessage
    }, { status: 500 });
  }
}
