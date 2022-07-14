import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/'],
};

async function fetchJson<ResponseType extends object>(
  url: string
): Promise<ResponseType> {
  const controller = new globalThis.AbortController();
  const timeoutID = globalThis.setTimeout(() => {
    controller.abort();
  }, 5000);

  const response = await globalThis.fetch(url, {
    signal: controller.signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  globalThis.clearTimeout(timeoutID);

  if (!response.ok) {
    throw new Error();
  }

  return response.status === 204 ? {} : response.json();
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl.clone();

  if (url.searchParams.has('name')) {
    return NextResponse.next();
  }

  const origin = process.env.NODE_ENV === 'development' ?
    'http://localhost:3000' :
    `https://${request.headers.get('host')}`;

  const data = await fetchJson<{ name: string }>(`${origin}/api/example`);

  url.searchParams.append('name', data.name);
  return NextResponse.redirect(url);
}
