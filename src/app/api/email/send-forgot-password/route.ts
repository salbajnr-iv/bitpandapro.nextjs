import { NextRequest } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json();
    
    if (!email || !token) {
      return Response.json(
        { error: 'Email and token are required' }, 
        { status: 400 }
      );
    }
    
    await sendPasswordResetEmail(email, token);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return Response.json(
      { error: 'Failed to send password reset email' }, 
      { status: 500 }
    );
  }
}