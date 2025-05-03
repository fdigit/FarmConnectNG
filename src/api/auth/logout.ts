import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Since we're using client-side session management with localStorage,
    // the server-side logout is just a formality
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 