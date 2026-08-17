import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

function getStripe() { return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' }) }

export async function POST(req: NextRequest) {
  try {
    const { priceId, returnPath } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const isOneTime = priceId === process.env.STRIPE_REPORT_PRICE_ID
    const isGuest = !user

    const successUrl = isGuest
      ? `${baseUrl}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`
      : returnPath
        ? `${baseUrl}${returnPath}`
        : `${baseUrl}/dashboard?upgraded=1`

    const isTrialPrice = priceId === process.env.STRIPE_PRO_TRIAL_PRICE_ID
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: isOneTime ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: `${baseUrl}/upgrade`,
      metadata: { userId: user?.id || '', priceId },
      ...(user?.email ? { customer_email: user.email } : {}),
    }

    if (isTrialPrice) {
      sessionParams.subscription_data = {
        trial_period_days: 7,
        trial_settings: { end_behavior: { missing_payment_method: 'cancel' } },
      }
    }

    const session = await getStripe().checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
