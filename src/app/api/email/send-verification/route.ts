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
    
    // Find or create the user by email
    let user = await prisma.user.findUnique({
      where: { email },
    });
    
    // If user doesn't exist in local database, create them
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
        },
      });
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