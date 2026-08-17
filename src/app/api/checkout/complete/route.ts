import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase/server'

function getStripe() { return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' }) }

export async function POST(req: NextRequest) {
  const { session_id, password } = await req.json()
  if (!session_id || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(session_id)
    const email = session.customer_details?.email
    if (!email) return NextResponse.json({ error: 'No email on session' }, { status: 400 })

    const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
    const priceId = session.metadata?.priceId
    const plan = priceId === process.env.STRIPE_ELITE_PRICE_ID ? 'elite' : 'pro'

    const supabase = createServiceClient()

    // Create the user account
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (createError) {
      // If user already exists, still proceed to grant pro
      if (!createError.message.includes('already')) {
        return NextResponse.json({ error: createError.message }, { status: 400 })
      }
    }

    const userId = created?.user?.id

    if (userId) {
      // Update profile with pro plan and stripe customer id
      await supabase.from('profiles').update({
        plan,
        ...(customerId ? { stripe_customer_id: customerId } : {}),
      }).eq('id', userId)

      // Update Stripe customer metadata with userId for future webhooks
      if (customerId) {
        await getStripe().customers.update(customerId, { metadata: { userId } })
      }
    }

    return NextResponse.json({ email })
  } catch (e) {
    console.error('[checkout/complete]', e)
    return NextResponse.json({ error: 'Failed to complete setup' }, { status: 500 })
  }
}
