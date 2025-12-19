"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // Call the API route to send the password reset email
      const response = await fetch('/api/email/send-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="bp-container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <Image 
                  src="https://sbcdn.bitpanda.com/300x88/e191121310/website_header-logo-01.svg" 
                  alt="Bitpanda logo" 
                  width={150}
                  height={44}
                  className="h-11 w-auto"
                />
              </div>
            </Link>
            <Link href="/" className="bp-link">
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="bp-container">
          <div className="max-w-md w-full mx-auto">
            <div className="auth-header">
              <h1 className="auth-title">
                {isSubmitted ? "Check your email" : "Forgot password?"}
              </h1>
              <p className="auth-subtitle">
                {isSubmitted 
                  ? "We've sent a password reset link to your email address." 
                  : "Enter your email address and we'll send you a link to reset your password."}
              </p>
            </div>

            <div className="auth-form">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#d5fbeb]">
                    <svg className="h-6 w-6 text-[#16764d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Didn't receive the email? Check your spam folder or{' '}
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="bp-link"
                      >
                        try again
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="bp-button bp-button-lg w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : 'Send reset link'}
                    </button>
                  </div>
                </form>
              )}

              <div className="text-center mt-6">
                <Link href="/auth/login" className="bp-link">
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="bp-container">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 BITPANDA PRO. All rights reserved.</p>
            <div className="footer-links">
              <Link href="/terms" className="footer-link">Terms</Link>
              <Link href="/privacy" className="footer-link">Privacy</Link>
              <Link href="/security" className="footer-link">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}