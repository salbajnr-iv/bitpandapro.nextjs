import { NextRequest } from 'next/server';
import { sendVerificationEmail } from '@/lib/email';
import prisma from '@/lib/prisma';
import { createVerificationToken } from '@/lib/tokens';

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
      return Response.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }
    
    // Create a verification token
    const token = await createVerificationToken(user);
    
    // Send the verification email
    await sendVerificationEmail(email, token);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return Response.json(
      { error: 'Failed to send verification email' }, 
      { status: 500 }
    );
  }
}