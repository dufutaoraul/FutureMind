import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const N8N_UPLOAD_WEBHOOK = process.env.N8N_UPLOAD_WEBHOOK_URL
      || 'https://n8n.aifunbox.com/webhook/fca634ab-8e03-4a6f-99f3-c7dc46e772ae'

    const formData = await req.formData()

    // 直接转发表单数据到 n8n
    const response = await fetch(N8N_UPLOAD_WEBHOOK, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: 'UPLOAD_FAILED', details: errorText }, { status: 502 })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
