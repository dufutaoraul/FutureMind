import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log('N8N chat callback received:', data)

    // 这里可以添加额外的处理逻辑
    // 比如保存到数据库、触发通知等

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Chat callback error:', error)
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
