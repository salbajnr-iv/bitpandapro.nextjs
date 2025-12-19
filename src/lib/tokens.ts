import prisma from './prisma';
import { User } from '@prisma/client';

// Generate a random token
export function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Create a verification token for a user
export async function createVerificationToken(user: User): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  
  await prisma.verificationToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });
  
  return token;
}

// Create a password reset token for a user
export async function createPasswordResetToken(user: User): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });
  
  return token;
}

// Verify a verification token
export async function verifyVerificationToken(token: string): Promise<User | null> {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  });
  
  if (!verificationToken) {
    return null;
  }
  
  // Check if token has expired
  if (verificationToken.expiresAt < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
    return null;
  }
  
  return verificationToken.user;
}

// Verify a password reset token
export async function verifyPasswordResetToken(token: string): Promise<User | null> {
  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });
  
  if (!passwordResetToken) {
    return null;
  }
  
  // Check if token has expired
  if (passwordResetToken.expiresAt < new Date()) {
    // Delete expired token
    await prisma.passwordResetToken.delete({
      where: { id: passwordResetToken.id },
    });
    return null;
  }
  
  return passwordResetToken.user;
}

// Delete a verification token after use
export async function deleteVerificationToken(token: string): Promise<void> {
  await prisma.verificationToken.delete({
    where: { token },
  });
}

// Delete a password reset token after use
export async function deletePasswordResetToken(token: string): Promise<void> {
  await prisma.passwordResetToken.delete({
    where: { token },
  });
}