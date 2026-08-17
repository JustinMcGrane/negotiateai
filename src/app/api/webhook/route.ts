import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase/server'

function getStripe() { return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' }) }


export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (e) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    const sub = event.data.object as Stripe.Subscription
    const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
    const supabase = createServiceClient()

    if (sub.status === 'active' || sub.status === 'trialing') {
      const priceId = sub.items.data[0]?.price.id
      const plan = priceId === process.env.STRIPE_ELITE_PRICE_ID ? 'elite' : 'pro'
      await supabase.from('profiles').update({ plan }).eq('stripe_customer_id', customerId)
    } else if (sub.status === 'canceled' || sub.status === 'unpaid' || sub.status === 'past_due') {
      await supabase.from('profiles').update({ plan: 'free' }).eq('stripe_customer_id', customerId)
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const supabase = createServiceClient()
    const isReport = session.mode === 'payment'
    let plan: string
    if (isReport) {
      plan = 'report'
    } else if (session.metadata?.priceId === process.env.STRIPE_ELITE_PRICE_ID) {
      plan = 'elite'
    } else {
      plan = 'pro'
    }
    const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id

    if (userId) {
      const { error } = await supabase
        .from('profiles')
        .update({ plan, ...(customerId ? { stripe_customer_id: customerId } : {}) })
        .eq('id', userId)
      if (error) console.error('[webhook] Failed to update profile for user', userId, error)
    } else if (customerId) {
      // Guest checkout — account will be created on /upgrade/success.
      // Store stripe_customer_id now so the profile update on account creation can match it.
      console.log('[webhook] Guest checkout completed, customer:', customerId)
    }
  }

  return NextResponse.json({ received: true })
}
