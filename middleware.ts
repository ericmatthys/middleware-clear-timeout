import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/'],
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const timeoutID = globalThis.setTimeout(() => {
    globalThis.console.log('timeout');
  }, 1000);

  globalThis.clearTimeout(timeoutID);

  return NextResponse.next();
}
