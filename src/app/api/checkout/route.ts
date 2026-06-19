import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

function getStripe() { return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' }) }

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { priceId } = await req.json()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const isOneTime = priceId === process.env.STRIPE_REPORT_PRICE_ID
    const session = await getStripe().checkout.sessions.create({
      mode: isOneTime ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?upgraded=1`,
      cancel_url: `${baseUrl}/account/billing`,
      metadata: { userId: user?.id || '' },
      customer_email: user?.email,
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
