import {NextResponse} from 'next/server';

const excludedPaths = [
  '/agents',
  '/realtors_portal',
  '/auth',
  '/inspection-feedback',
  '/listing-details',
];

export function middleware(request) {
  const {nextUrl} = request;
  const userToken = request.cookies.get('token');
  const agentToken = request.cookies.get('a_token');

  const isCustomerAuthRoute = nextUrl.pathname === '/';
  const isCustomerRoute =
    !excludedPaths.some(excludedPath => nextUrl.pathname.startsWith(excludedPath)) &&
    !isCustomerAuthRoute;

  const isAgentAuthRoute = nextUrl.pathname.startsWith('/agents/auth');
  const isAgentVerificationRoute = nextUrl.pathname === '/agents';
  const isAgentRoute =
    !isAgentAuthRoute && !isAgentVerificationRoute && nextUrl.pathname.startsWith('/agents');

  // Redirect customers if they are logged in and accessing the auth route
  if (isCustomerAuthRoute && userToken?.value) {
    return NextResponse.redirect(new URL('/properties', request.url));
  }

  // Redirect customers to the homepage if not logged in
  if (isCustomerRoute && !userToken?.value) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect agents to listings if they are logged in and accessing the auth route
  if (isAgentAuthRoute && agentToken) {
    return NextResponse.redirect(new URL('/agents/listings', request.url));
  }

  // Redirect agents to the login page if they are accessing agent routes without a valid token
  if (isAgentRoute && !agentToken) {
    return NextResponse.redirect(new URL('/agents/auth/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
