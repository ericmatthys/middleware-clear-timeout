import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/'],
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const timeoutID = setTimeout(() => {
    console.log('timeout');
  }, 1000);

  clearTimeout(timeoutID);

  return NextResponse.next();
}
