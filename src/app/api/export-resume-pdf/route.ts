import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

export const runtime = 'nodejs'
export const maxDuration = 30

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 50,
    paddingRight: 50,
    lineHeight: 1.5,
    color: '#1a1a1a',
  },
  line: {
    marginBottom: 3,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  heading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 13,
    marginBottom: 4,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 2,
  },
  spacer: {
    marginBottom: 4,
  },
})

function buildDoc(content: string) {
  const lines = content.split('\n')

  const elements = lines.map((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) {
      return React.createElement(View, { key: i, style: styles.spacer })
    }

    const looksLikeHeading =
      /^(EXPERIENCE|EDUCATION|SKILLS|SUMMARY|WORK HISTORY|PROJECTS|CERTIFICATIONS|OBJECTIVE|CONTACT|PROFESSIONAL SUMMARY)/i.test(trimmed) ||
      (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && /[A-Z]{3}/.test(trimmed) && !/[.,:;]/.test(trimmed))

    if (looksLikeHeading) {
      return React.createElement(Text, { key: i, style: styles.heading }, trimmed.replace(/\*\*/g, ''))
    }

    const hasBold = /\*\*(.+?)\*\*/.test(trimmed)
    if (hasBold) {
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/)
      const children = parts.map((part, j) =>
        part.startsWith('**') && part.endsWith('**')
          ? React.createElement(Text, { key: j, style: styles.bold }, part.slice(2, -2))
          : part
      )
      return React.createElement(Text, { key: i, style: styles.line }, ...children)
    }

    return React.createElement(Text, { key: i, style: styles.line }, trimmed)
  })

  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(View, null, ...elements)
    )
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { content } = body as { content: string }

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 })
    }

    const doc = buildDoc(content)
    const buffer = await renderToBuffer(doc)

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume-hayven.pdf"',
        'Content-Length': buffer.length.toString(),
      },
    })
  } catch (err) {
    console.error('export-resume-pdf error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF.' }, { status: 500 })
  }
}
