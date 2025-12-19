import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyVerificationToken, deleteVerificationToken } from '@/lib/tokens';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return Response.json(
        { error: 'Token is required' }, 
        { status: 400 }
      );
    }
    
    // Verify the token
    const user = await verifyVerificationToken(token);
    
    if (!user) {
      return Response.json(
        { error: 'Invalid or expired token' }, 
        { status: 400 }
      );
    }
    
    // Mark the user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
    
    // Delete the used token
    await deleteVerificationToken(token);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error verifying email:', error);
    return Response.json(
      { error: 'Failed to verify email' }, 
      { status: 500 }
    );
  }
}