import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

export const runtime = 'nodejs'
export const maxDuration = 30

const SECTION_HEADINGS = /^(EXPERIENCE|WORK EXPERIENCE|WORK HISTORY|EDUCATION|SKILLS|SUMMARY|PROFESSIONAL SUMMARY|OBJECTIVE|PROJECTS|CERTIFICATIONS|AWARDS|VOLUNTEER|LANGUAGES|INTERESTS|CONTACT|PUBLICATIONS|REFERENCES)/i

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 44,
    paddingBottom: 44,
    paddingLeft: 52,
    paddingRight: 52,
    color: '#1a1a1a',
    lineHeight: 1.45,
  },
  // Name / header
  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    color: '#1a1a1a',
    marginBottom: 3,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  contactItem: {
    fontSize: 9,
    color: '#555',
  },
  // Section
  sectionHeading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 14,
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: '#d0d0d0',
  },
  // Job entry
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 1,
  },
  entryTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#1a1a1a',
    flex: 1,
  },
  entryDate: {
    fontSize: 9,
    color: '#666',
    marginLeft: 8,
    flexShrink: 0,
  },
  entrySubtitle: {
    fontSize: 9.5,
    color: '#444',
    marginBottom: 3,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 2,
  },
  bulletDot: {
    fontSize: 10,
    color: '#555',
    marginRight: 5,
    lineHeight: 1.45,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#1a1a1a',
    lineHeight: 1.45,
  },
  bodyText: {
    fontSize: 10,
    color: '#1a1a1a',
    lineHeight: 1.55,
    marginBottom: 3,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 2,
  },
  skillChip: {
    fontSize: 9,
    color: '#333',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  entryBlock: {
    marginBottom: 8,
  },
})

// ─── Parser ──────────────────────────────────────────────────────────────────

type Line = { raw: string; clean: string }
type Section = { heading: string; lines: Line[] }

function parseResume(content: string): { nameLines: string[]; contactLines: string[]; sections: Section[] } {
  const raw = content.split('\n')
  const nameLines: string[] = []
  const contactLines: string[] = []
  const sections: Section[] = []
  let current: Section | null = null
  let headerDone = false

  const CONTACT_RE = /[@|·|•]|linkedin|github|http|phone|tel:|email:|\.com|^\+?[\d\s\-().]{7,}/i
  const DATE_RE = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december|\d{4}|present|current)\b/i

  for (const rawLine of raw) {
    const clean = rawLine.replace(/\*\*/g, '').trim()
    if (!clean) continue

    if (!headerDone) {
      if (SECTION_HEADINGS.test(clean)) {
        headerDone = true
        current = { heading: clean.toUpperCase(), lines: [] }
        sections.push(current)
        continue
      }
      if (CONTACT_RE.test(clean) || DATE_RE.test(clean)) {
        contactLines.push(clean)
      } else {
        nameLines.push(clean)
      }
      continue
    }

    if (SECTION_HEADINGS.test(clean)) {
      current = { heading: clean.toUpperCase(), lines: [] }
      sections.push(current)
      continue
    }

    if (current) current.lines.push({ raw: rawLine, clean })
  }

  return { nameLines, contactLines, sections }
}

// ─── Renderers ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBoldText(text: string, baseStyle: any, key: string | number) {
  if (!/\*\*/.test(text)) {
    return React.createElement(Text, { key, style: baseStyle }, text)
  }
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  const children = parts.map((p, j) =>
    p.startsWith('**') && p.endsWith('**')
      ? React.createElement(Text, { key: j, style: { fontFamily: 'Helvetica-Bold' } }, p.slice(2, -2))
      : p
  )
  return React.createElement(Text, { key, style: baseStyle }, ...children)
}

const DATE_RANGE_RE = /(.+?)\s{2,}(.+?\d{4}.*)$|(.+?)\s*\|\s*(.+)$/

function renderSection(section: Section, idx: number) {
  const heading = React.createElement(Text, { key: 'h', style: styles.sectionHeading },
    section.heading.replace(/\*\*/g, '')
  )

  const isSkills = /SKILL/i.test(section.heading)
  const isSummary = /SUMMARY|OBJECTIVE/i.test(section.heading)

  const blocks: React.ReactElement[] = []
  let i = 0
  const lines = section.lines

  while (i < lines.length) {
    const { raw, clean } = lines[i]

    // Bullet line
    if (/^[-•*▪‣]/.test(clean) || /^\s{2,}[-•*]/.test(raw)) {
      const text = clean.replace(/^[-•*▪‣]\s*/, '')
      blocks.push(
        React.createElement(View, { key: i, style: styles.bullet },
          React.createElement(Text, { style: styles.bulletDot }, '•'),
          renderBoldText(text, styles.bulletText, 'bt')
        )
      )
      i++; continue
    }

    // Skills section — render as chips
    if (isSkills) {
      const skills = clean.split(/[,|·•]+/).map(s => s.trim()).filter(Boolean)
      if (skills.length > 1) {
        const chips = skills.map((s, j) =>
          React.createElement(Text, { key: j, style: styles.skillChip }, s)
        )
        blocks.push(React.createElement(View, { key: i, style: styles.skillsRow }, ...chips))
        i++; continue
      }
    }

    // Summary section — body paragraph
    if (isSummary) {
      blocks.push(renderBoldText(clean, styles.bodyText, i))
      i++; continue
    }

    // Try to parse as job/education entry header (title + date on same line)
    const dateMatch = DATE_RANGE_RE.exec(clean)
    if (dateMatch) {
      const title = (dateMatch[1] || dateMatch[3] || '').trim()
      const date = (dateMatch[2] || dateMatch[4] || '').trim()
      const entryChildren: React.ReactElement[] = [
        React.createElement(View, { key: 'eh', style: styles.entryHeader },
          React.createElement(Text, { style: styles.entryTitle }, title.replace(/\*\*/g, '')),
          date ? React.createElement(Text, { style: styles.entryDate }, date.replace(/\*\*/g, '')) : null as unknown as React.ReactElement
        )
      ]
      // Look ahead for subtitle (company / institution)
      if (i + 1 < lines.length && !/^[-•*▪‣]/.test(lines[i + 1].clean) && !SECTION_HEADINGS.test(lines[i + 1].clean) && !DATE_RANGE_RE.test(lines[i + 1].clean)) {
        i++
        entryChildren.push(
          React.createElement(Text, { key: 'es', style: styles.entrySubtitle }, lines[i].clean.replace(/\*\*/g, ''))
        )
      }
      blocks.push(React.createElement(View, { key: i, style: styles.entryBlock }, ...entryChildren))
      i++; continue
    }

    // Bold-only line = job title / company name
    if (/^\*\*.*\*\*$/.test(clean.trim())) {
      blocks.push(
        React.createElement(Text, { key: i, style: styles.entryTitle }, clean.replace(/\*\*/g, ''))
      )
      i++; continue
    }

    // Fallback body text
    blocks.push(renderBoldText(clean, styles.bodyText, i))
    i++
  }

  return React.createElement(View, { key: idx }, heading, ...blocks)
}

function buildDoc(content: string) {
  const { nameLines, contactLines, sections } = parseResume(content)

  const namePart = nameLines.length > 0
    ? React.createElement(Text, { style: styles.name }, nameLines[0])
    : null

  const subtitleLine = nameLines.length > 1
    ? React.createElement(Text, { style: { fontFamily: 'Helvetica', fontSize: 11, color: '#444', marginBottom: 4 } }, nameLines.slice(1).join(' · '))
    : null

  const contactPart = contactLines.length > 0
    ? React.createElement(View, { style: styles.contactRow },
        ...contactLines.flatMap((c, i) => {
          const parts = c.split(/\s{2,}|[|·•]/).map(s => s.trim()).filter(Boolean)
          return parts.map((p, j) =>
            React.createElement(Text, { key: `${i}-${j}`, style: styles.contactItem }, p)
          )
        })
      )
    : null

  const sectionElements = sections.map((s, i) => renderSection(s, i))

  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.page },
      React.createElement(View, null,
        namePart,
        subtitleLine,
        contactPart,
        ...sectionElements
      )
    )
  )
}

// ─── Route ───────────────────────────────────────────────────────────────────

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
