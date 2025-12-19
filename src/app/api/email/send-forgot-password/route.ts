import { NextRequest } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/email';
import prisma from '@/lib/prisma';
import { createPasswordResetToken } from '@/lib/tokens';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return Response.json(
        { error: 'Email is required' }, 
        { status: 400 }
      );
    }
    
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      // Don't reveal that the email doesn't exist
      return Response.json({ success: true });
    }
    
    // Create a password reset token
    const token = await createPasswordResetToken(user);
    
    // Send the password reset email
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