import { NextResponse } from 'next/server';

// Handles user logout by clearing the authentication token cookie.
// Sets the 'token' cookie with an empty value and maxAge 0 to expire it immediately,
// effectively removing the cookie from the browser.
// Returns a JSON response indicating success.
export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the token cookie by setting it to empty and expiring it
  response.cookies.set('token', '', {
    maxAge: 0,
    path: '/',
  });

  // Return the response confirming logout
  return response;
}
