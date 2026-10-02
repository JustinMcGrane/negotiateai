'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function RaiseCalculatorWidget() {
  const [currentSalary, setCurrentSalary] = useState('')
  const [raiseType, setRaiseType] = useState<'percent' | 'amount'>('percent')
  const [raiseValue, setRaiseValue] = useState('')
  const [payType, setPayType] = useState<'annual' | 'hourly'>('annual')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [result, setResult] = useState<null | {
    newSalary: number
    raiseAmount: number
    raisePercent: number
    monthlyIncrease: number
    weeklyIncrease: number
  }>(null)

  function calculate() {
    const salary = parseFloat(currentSalary.replace(/,/g, ''))
    const value = parseFloat(raiseValue.replace(/,/g, ''))
    if (!salary || !value) return

    let annualSalary = salary
    if (payType === 'hourly') {
      annualSalary = salary * parseFloat(hoursPerWeek) * 52
    }

    let raiseAmount: number
    let raisePercent: number

    if (raiseType === 'percent') {
      raisePercent = value
      raiseAmount = annualSalary * (value / 100)
    } else {
      raiseAmount = value
      raisePercent = (value / annualSalary) * 100
    }

    const newSalary = annualSalary + raiseAmount

    setResult({
      newSalary,
      raiseAmount,
      raisePercent,
      monthlyIncrease: raiseAmount / 12,
      weeklyIncrease: raiseAmount / 52,
    })
  }

  function fmt(n: number) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  }

  function fmtD(n: number) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
      {/* Pay type toggle */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Pay type</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['annual', 'hourly'] as const).map(t => (
            <button key={t} onClick={() => setPayType(t)} style={{
              flex: 1, padding: '10px', borderRadius: 8, border: '1.5px solid',
              borderColor: payType === t ? '#0f172a' : '#e2e8f0',
              background: payType === t ? '#0f172a' : '#fff',
              color: payType === t ? '#fff' : '#64748b',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>{t === 'annual' ? 'Annual salary' : 'Hourly wage'}</button>
          ))}
        </div>
      </div>

      {/* Current salary */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>
          Current {payType === 'annual' ? 'annual salary' : 'hourly wage'}
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>$</span>
          <input
            type="number"
            value={currentSalary}
            onChange={e => setCurrentSalary(e.target.value)}
            placeholder={payType === 'annual' ? '75000' : '35'}
            style={{ width: '100%', padding: '12px 14px 12px 28px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Hours per week (hourly only) */}
      {payType === 'hourly' && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Hours per week</label>
          <input
            type="number"
            value={hoursPerWeek}
            onChange={e => setHoursPerWeek(e.target.value)}
            placeholder="40"
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      )}

      {/* Raise type toggle */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Raise type</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['percent', 'amount'] as const).map(t => (
            <button key={t} onClick={() => setRaiseType(t)} style={{
              flex: 1, padding: '10px', borderRadius: 8, border: '1.5px solid',
              borderColor: raiseType === t ? '#0f172a' : '#e2e8f0',
              background: raiseType === t ? '#0f172a' : '#fff',
              color: raiseType === t ? '#fff' : '#64748b',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>{t === 'percent' ? 'Percentage %' : 'Dollar amount $'}</button>
          ))}
        </div>
      </div>

      {/* Raise value */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>
          {raiseType === 'percent' ? 'Raise percentage' : 'Raise amount'}
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>
            {raiseType === 'percent' ? '%' : '$'}
          </span>
          <input
            type="number"
            value={raiseValue}
            onChange={e => setRaiseValue(e.target.value)}
            placeholder={raiseType === 'percent' ? '5' : '5000'}
            style={{ width: '100%', padding: '12px 14px 12px 28px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <button onClick={calculate} style={{
        width: '100%', height: 52, background: '#0f172a', color: '#fff',
        border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer',
      }}>
        Calculate my raise
      </button>

      {/* Results */}
      {result && (
        <div style={{ marginTop: 32, borderTop: '1px solid #f1f5f9', paddingTop: 28 }}>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '24px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#16a34a', marginBottom: 8 }}>Your new salary</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>{fmt(result.newSalary)}</div>
            <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
              +{result.raisePercent % 1 === 0 ? result.raisePercent.toFixed(0) : result.raisePercent.toFixed(1)}% raise · +{fmt(result.raiseAmount)}/year
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Monthly increase</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{fmtD(result.monthlyIncrease)}</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Weekly increase</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{fmtD(result.weeklyIncrease)}</div>
            </div>
          </div>
        </div>
      )}

      {/* CTA below calculator */}
      <div style={{ marginTop: 24, background: '#0f172a', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Want to negotiate a bigger raise?</div>
          <div style={{ fontSize: 13, color: '#94a3b8' }}>Sarah will build you a personalized raise strategy and scripts.</div>
        </div>
        <Link href="/signup" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
          background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
          color: '#fff', padding: '12px 20px', borderRadius: 9,
          fontSize: 14, fontWeight: 700, textDecoration: 'none',
        }}>
          Get Started Free <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
