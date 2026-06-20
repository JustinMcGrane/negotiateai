'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight, Briefcase, TrendingUp, FileText, Target, CheckCircle } from 'lucide-react'

const GOALS = [
  { id: 'new_job', icon: Briefcase, label: 'Land a new job', desc: 'Find roles, nail interviews, get the offer' },
  { id: 'negotiate', icon: TrendingUp, label: 'Negotiate my offer', desc: 'Counter, push back, and get what I deserve' },
  { id: 'raise', icon: Target, label: 'Get a raise or promotion', desc: 'Build my case and ask with confidence' },
  { id: 'resume', icon: FileText, label: 'Improve my resume', desc: 'Make it stronger and get more callbacks' },
]

const SITUATIONS = [
  { id: 'actively_looking', label: 'Actively applying' },
  { id: 'casually_looking', label: 'Casually exploring' },
  { id: 'have_offer', label: 'I have an offer in hand' },
  { id: 'employed', label: 'Employed, not looking yet' },
]

const EXPERIENCE = [
  { id: '0-2', label: '0 - 2 years' },
  { id: '3-5', label: '3 - 5 years' },
  { id: '6-10', label: '6 - 10 years' },
  { id: '10+', label: '10+ years' },
]

const FIRST_STEPS: Record<string, { href: string; label: string }> = {
  new_job: { href: '/recruiter', label: 'Talk to Sarah, your AI recruiter' },
  negotiate: { href: '/tools/offer-evaluator', label: 'Evaluate your offer' },
  raise: { href: '/tools/raise-builder', label: 'Build your raise request' },
  resume: { href: '/resume', label: 'Analyze your resume' },
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState('')
  const [situation, setSituation] = useState('')
  const [experience, setExperience] = useState('')
  const [role, setRole] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function finish() {
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          onboarding_goal: goal,
          onboarding_situation: situation,
          onboarding_experience: experience,
          onboarding_role: role,
          onboarded_at: new Date().toISOString(),
        })
      }
    } catch {}
    const firstStep = FIRST_STEPS[goal] || { href: '/dashboard' }
    router.push(firstStep.href)
  }

  const totalSteps = 3

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-background-secondary)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px 20px',
    }}>
      <div style={{ marginBottom: 32 }}>
        <Image src="/logo.png" alt="NegotiateAI" width={160} height={48} style={{ objectFit: 'contain' }} priority />
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: 520, marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: i + 1 <= step ? '#141414' : '#e5e7eb',
                color: i + 1 <= step ? '#fff' : 'var(--color-text-tertiary)',
                fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}>
                {i + 1 < step ? <CheckCircle size={13} /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div style={{
                  height: 2, width: 140,
                  background: i + 1 < step ? '#141414' : '#e5e7eb',
                  transition: 'background 0.2s',
                }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Step {step} of {totalSteps}</div>
      </div>

      <div style={{
        width: '100%', maxWidth: 520,
        background: '#fff',
        border: '0.5px solid var(--color-border-secondary)',
        borderRadius: 16, padding: 36,
      }}>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>What brings you here?</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: '0 0 28px', lineHeight: 1.6 }}>
              We will personalize your experience based on where you are in your career journey.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {GOALS.map(({ id, icon: Icon, label, desc }) => (
                <button
                  key={id}
                  onClick={() => setGoal(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
                    border: goal === id ? '2px solid #141414' : '1px solid var(--color-border-secondary)',
                    background: goal === id ? '#f9f9f9' : '#fff',
                    textAlign: 'left', transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 9,
                    background: goal === id ? '#141414' : '#f3f4f6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'background 0.15s',
                  }}>
                    <Icon size={17} color={goal === id ? '#fff' : '#6b7280'} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{desc}</div>
                  </div>
                  {goal === id && (
                    <CheckCircle size={16} color="#141414" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!goal}
              style={{
                marginTop: 24, width: '100%', height: 44,
                background: '#141414', color: '#fff', border: 'none',
                borderRadius: 10, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                opacity: !goal ? 0.4 : 1, transition: 'opacity 0.15s',
              }}
            >
              Continue <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Step 2: Situation */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>Where are you right now?</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: '0 0 28px', lineHeight: 1.6 }}>
              This helps Sarah give you the most relevant advice from day one.
            </p>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: 10, letterSpacing: '0.04em' }}>YOUR SITUATION</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SITUATIONS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSituation(id)}
                    style={{
                      padding: '12px 16px', borderRadius: 9, cursor: 'pointer',
                      border: situation === id ? '2px solid #141414' : '1px solid var(--color-border-secondary)',
                      background: situation === id ? '#f9f9f9' : '#fff',
                      textAlign: 'left', fontSize: 14, fontWeight: situation === id ? 600 : 400,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      transition: 'all 0.15s',
                    }}
                  >
                    {label}
                    {situation === id && <CheckCircle size={15} color="#141414" />}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: 10, letterSpacing: '0.04em' }}>YEARS OF EXPERIENCE</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {EXPERIENCE.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setExperience(id)}
                    style={{
                      padding: '11px 14px', borderRadius: 9, cursor: 'pointer',
                      border: experience === id ? '2px solid #141414' : '1px solid var(--color-border-secondary)',
                      background: experience === id ? '#f9f9f9' : '#fff',
                      fontSize: 13, fontWeight: experience === id ? 600 : 400,
                      transition: 'all 0.15s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: 8, letterSpacing: '0.04em' }}>YOUR ROLE / FIELD</div>
              <input
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. Product Manager, Software Engineer, Sales"
                style={{
                  width: '100%', height: 42, padding: '0 14px', fontSize: 14,
                  border: '1px solid var(--color-border-secondary)', borderRadius: 9,
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  height: 44, padding: '0 20px',
                  background: 'transparent', color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border-secondary)',
                  borderRadius: 10, fontSize: 14, cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!situation || !experience}
                style={{
                  flex: 1, height: 44,
                  background: '#141414', color: '#fff', border: 'none',
                  borderRadius: 10, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  opacity: !situation || !experience ? 0.4 : 1, transition: 'opacity 0.15s',
                }}
              >
                Continue <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Ready */}
        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#f0fdf4', border: '2px solid #10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <CheckCircle size={28} color="#10b981" />
            </div>

            <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>You are all set.</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: '0 0 32px', lineHeight: 1.7 }}>
              Sarah is ready to help you. Based on your goals, here is the best place to start.
            </p>

            <div style={{
              background: '#f9f9f9', border: '1px solid var(--color-border-secondary)',
              borderRadius: 12, padding: '20px 24px', marginBottom: 28, textAlign: 'left',
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.05em' }}>YOUR FIRST STEP</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {FIRST_STEPS[goal]?.label || 'Go to your dashboard'}
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                We will get you moving in the right direction right away.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={finish}
                disabled={saving}
                style={{
                  width: '100%', height: 46,
                  background: '#141414', color: '#fff', border: 'none',
                  borderRadius: 10, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? 'Setting things up…' : 'Take me there'} {!saving && <ArrowRight size={15} />}
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                style={{
                  width: '100%', height: 40,
                  background: 'transparent', color: 'var(--color-text-tertiary)',
                  border: 'none', fontSize: 13, cursor: 'pointer',
                }}
              >
                Skip to dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
