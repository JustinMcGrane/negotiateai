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

  if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription
    if (sub.status === 'canceled' || sub.status === 'unpaid' || sub.status === 'past_due') {
      const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
      const supabase = createServiceClient()
      await supabase.from('profiles').update({ plan: 'free' }).eq('stripe_customer_id', customerId)
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId

    if (!userId) {
      console.warn('[webhook] checkout.session.completed missing userId, session:', session.id)
      return NextResponse.json({ received: true })
    }

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
    const { error } = await supabase
      .from('profiles')
      .update({ plan, ...(customerId ? { stripe_customer_id: customerId } : {}) })
      .eq('id', userId)

    if (error) {
      console.error('[webhook] Failed to update profile plan for user', userId, error)
    }
  }

  return NextResponse.json({ received: true })
}
