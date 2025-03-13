import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname.startsWith('/mobile/api')) {
    const xIdp = request.headers.get('X-idp-id-token');
    const xCtn = request.headers.get('X-Ctn');

    if (!xIdp || !xCtn) {
      return NextResponse.json({ error: 'No headers provided' }, { status: 400 });
    }

    const externalApiDomain = process.env.EXTERNAL_API_DOMAIN;
    if (!externalApiDomain) {
      return NextResponse.json({ error: 'External API domain not set' }, { status: 500 });
    }

    const targetUrl = `${externalApiDomain}${url.pathname}${url.search}`;

    const body = request.body ? await request.json() : undefined;
    const headers = {
      "X-idp-id-token": xIdp,
      "X-CTN": xCtn,
      'Content-Type': 'application/json'
    };

    console.log('proxy-request', {
      targetUrl,
      method: request.method,
      headers: headers,
      body,
    });

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: {
          "X-idp-id-token": xIdp,
          "X-CTN": xCtn,
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const responseBody = await response.json();

      console.log('proxy-response', {
        status: response.status,
        body: responseBody,
      });

      return NextResponse.json(responseBody, {
        status: response.status,
        headers: response.headers,
      });
    } catch (error) {
      console.error('Fetch error:', error);
      return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/mobile/api/:path*',
};
