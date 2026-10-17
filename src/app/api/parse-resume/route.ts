import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const type = file.type
    const name = file.name.toLowerCase()

    let text = ''

    if (type === 'application/pdf' || name.endsWith('.pdf')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfParseModule = await import('pdf-parse') as any
      const pdfParse = pdfParseModule.default ?? pdfParseModule
      const result = await pdfParse(buffer)
      text = result.text
    } else if (
      type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      name.endsWith('.docx')
    ) {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Please upload a PDF or DOCX file.' }, { status: 400 })
    }

    text = text.replace(/\s{3,}/g, '\n\n').trim()
    if (!text || text.length < 50) {
      return NextResponse.json({ error: 'Could not extract text from the file. Please try a different format.' }, { status: 422 })
    }

    // Cap at 8000 chars to stay within reasonable context limits
    if (text.length > 8000) text = text.slice(0, 8000) + '\n[Resume truncated for length]'

    return NextResponse.json({ text, filename: file.name })
  } catch (err) {
    console.error('parse-resume error:', err)
    return NextResponse.json({ error: 'Failed to parse file.' }, { status: 500 })
  }
}
