import { auth } from '@/auth'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings']

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  
  // Check if the route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.includes(route)
  )
  
  const session = await auth()
  
  if (isProtectedRoute && !session) {
    // Redirect to login
    return NextResponse.redirect(new URL(`/connexion`, req.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}