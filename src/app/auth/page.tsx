"use client";

import Link from "next/link";
import { redirect } from 'next/navigation';

export default function AuthPage() {
  // Redirect to login page by default
  redirect('/auth/login');
}