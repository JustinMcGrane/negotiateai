import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  const isPublic =
    pathname === '/' ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/worth') ||
    pathname.startsWith('/ai-career-coach') ||
    pathname.startsWith('/resume-builder') ||
    pathname.startsWith('/negotiation-simulator') ||
    pathname.startsWith('/compensation-analyzer') ||
    pathname.startsWith('/counter-offer-builder') ||
    pathname.startsWith('/offer-evaluator') ||
    pathname.startsWith('/objection-handler') ||
    pathname.startsWith('/raise-request-builder') ||
    pathname.startsWith('/negotiation-playbook') ||
    pathname.startsWith('/interview-salary-coach') ||
    pathname.startsWith('/job-tracker') ||
    pathname.startsWith('/equity-calculator') ||
    pathname.startsWith('/raise-calculator') ||
    pathname.startsWith('/paycheck-calculator') ||
    pathname.startsWith('/salary-to-hourly-calculator') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/upgrade')

  if (isPublic) return NextResponse.next()

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as Parameters<typeof supabaseResponse.cookies.set>[2])
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup')
  const isProtected =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/tools') ||
    pathname.startsWith('/progress') ||
    pathname.startsWith('/account') ||
    pathname.startsWith('/report') ||
    pathname.startsWith('/jobs') ||
    pathname.startsWith('/tracker') ||
    pathname.startsWith('/roleplay') ||
    pathname.startsWith('/live-coach') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/analyze')

  if (!user && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
