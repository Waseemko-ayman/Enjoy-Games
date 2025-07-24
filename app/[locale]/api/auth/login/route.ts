import { NextResponse } from 'next/server';

// Handles login by receiving a token from the request body,
// then sets it as an HTTP-only cookie for authentication purposes.
// The cookie is configured to be secure in production,
// restricts cross-site usage with SameSite strict policy,
// lasts for one week, and is accessible across the entire site.
export async function POST(req: Request) {
  // Parse JSON body to extract token
  const { token } = await req.json();

  // Create JSON response indicating success
  const response = NextResponse.json({ success: true });

  // Set the token cookie with secure and HTTP-only flags
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  // Return the response with the cookie set
  return response;
}
