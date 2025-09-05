import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const clientIP =
    req.headers.get('x-forwarded-for')?.split(',')[0] || '0.0.0.0';

  const apiRes = await fetch('http://69.62.87.34/api/main-content', {
    headers: {
      'X-Forwarded-For': clientIP,
    },
  });

  const data = await apiRes.json();
  return NextResponse.json(data);
}
