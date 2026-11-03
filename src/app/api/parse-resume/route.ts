import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'nodejs'
export const maxDuration = 30

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const name = file.name.toLowerCase()
    const type = file.type

    const isPdf = type === 'application/pdf' || name.endsWith('.pdf')
    const isDocx = type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || name.endsWith('.docx')

    if (!isPdf && !isDocx) {
      return NextResponse.json({ error: 'Unsupported file type. Please upload a PDF or DOCX file.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    let text = ''

    if (isPdf) {
      const base64 = buffer.toString('base64')
      const response = await client.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'document',
              source: { type: 'base64', media_type: 'application/pdf', data: base64 },
            },
            {
              type: 'text',
              text: 'Extract all text from this resume exactly as written. Output only the raw text content, no commentary.',
            },
          ],
        }],
      })
      text = response.content[0].type === 'text' ? response.content[0].text : ''
    } else {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    }

    text = text.replace(/\s{3,}/g, '\n\n').trim()
    if (!text || text.length < 50) {
      return NextResponse.json({ error: 'Could not extract text from the file. Please try a different format.' }, { status: 422 })
    }

    if (text.length > 8000) text = text.slice(0, 8000) + '\n[Resume truncated for length]'

    return NextResponse.json({ text, filename: file.name })
  } catch (err) {
    console.error('parse-resume error:', err)
    return NextResponse.json({ error: 'Failed to parse file.' }, { status: 500 })
  }
}
