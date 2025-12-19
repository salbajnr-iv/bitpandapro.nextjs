// Simple test script to verify email API endpoints are working
require('dotenv').config();

async function testEmailApi() {
  try {
    console.log('Testing email API endpoints...');
    
    // Test 1: Send verification email
    console.log('1. Testing send verification email API endpoint...');
    const verificationResponse = await fetch('http://localhost:3000/api/email/send-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
      }),
    });
    
    console.log('   Verification email response status:', verificationResponse.status);
    const verificationResult = await verificationResponse.json();
    console.log('   Verification email response:', verificationResult);
    
    // Test 2: Send password reset email
    console.log('2. Testing send password reset email API endpoint...');
    const passwordResetResponse = await fetch('http://localhost:3000/api/email/send-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
      }),
    });
    
    console.log('   Password reset email response status:', passwordResetResponse.status);
    const passwordResetResult = await passwordResetResponse.json();
    console.log('   Password reset email response:', passwordResetResult);
    
    console.log('Email API endpoint tests completed!');
    
  } catch (error) {
    console.error('Email API endpoint test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

testEmailApi();