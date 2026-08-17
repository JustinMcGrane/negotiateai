import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() { return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' }) }

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('id')
  if (!sessionId) return NextResponse.json({ error: 'Missing session id' }, { status: 400 })

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    const email = session.customer_details?.email || ''
    return NextResponse.json({ email })
  } catch {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
}
