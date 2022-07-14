import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/'],
};

function timerTest() {
  return new Promise<void>((resolve) => {
    console.log('setting timers');

    const timeout1 = globalThis.setTimeout(() => {
      // This callback won't be called since timeout2 cancels it.
      console.log('timeout 1: should be unreachable!');
    }, 8000);
  
    globalThis.setTimeout(() => {
      console.log('timeout 2');
      globalThis.clearTimeout(timeout1);
      resolve();
    }, 3000);  
  })  
}

export async function middleware(request: NextRequest, event: NextFetchEvent): Promise<NextResponse> {
  event.waitUntil(timerTest());

  return NextResponse.next()
}
