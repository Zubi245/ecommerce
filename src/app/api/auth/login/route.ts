import { NextResponse } from 'next/server';

// In a real application, you would:
// 1. Hash passwords using bcrypt
// 2. Store users in database
// 3. Use JWT tokens or sessions
// 4. Implement proper authentication middleware

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'adminsaim';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Afr3fasDF#@rSDFe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          username: username,
          role: 'admin',
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
