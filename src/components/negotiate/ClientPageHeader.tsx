'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader } from './PageHeader'

interface Props {
  title: string
  description?: string
}

export function ClientPageHeader({ title, description }: Props) {
  const [userInitial, setUserInitial] = useState('?')
  const [plan, setPlan] = useState('free')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const { data: profile } = await supabase.from('profiles').select('name, plan').eq('id', data.user.id).single()
      setUserInitial((profile?.name || data.user.email || '?')[0].toUpperCase())
      setPlan(profile?.plan ?? 'free')
    })
  }, [])

  return <PageHeader title={title} description={description} userInitial={userInitial} plan={plan} />
}
