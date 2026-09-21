import { NextRequest, NextResponse } from 'next/server'
import { fetchSalaryData } from '@/lib/salaries/data'
import { getRoleBySlug } from '@/lib/salaries/roles'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  const role = getRoleBySlug(slug)
  if (!role) return NextResponse.json({ error: 'Role not found' }, { status: 404 })

  try {
    const data = await fetchSalaryData(role.title, role.context)
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' },
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch salary data' }, { status: 500 })
  }
}
