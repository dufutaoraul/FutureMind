// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { getClient } from '@/lib/supabase'
import { z } from 'zod'

const UpdateModuleSchema = z.object({
  key: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
})

function err(status: number, message: string) {
  return NextResponse.json({ error: { code: status, message } }, { status })
}

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message
  try { return JSON.stringify(e) } catch { return String(e) }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await getClient()

    const { data: module, error } = await supabase
      .from('content_module')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      return err(500, error.message)
    }

    if (!module) {
      return err(404, 'Module not found')
    }

    return NextResponse.json({ data: module })
  } catch (e: unknown) {
    return err(500, getErrorMessage(e))
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await getClient()

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser()
    if (userErr || !user) return err(401, 'Unauthorized')

    const body = await req.json()
    const parsed = UpdateModuleSchema.safeParse(body)
    if (!parsed.success) {
      return err(400, parsed.error.issues.map(i => i.message).join('; '))
    }

    const updateData = {
      ...parsed.data,
      updated_at: new Date().toISOString()
    }

    const { data: module, error } = await supabase
      .from('content_module')
      .update(updateData)
      .eq('id', params.id)
      .select('*')
      .single()

    if (error) {
      return err(500, error.message)
    }

    if (!module) {
      return err(404, 'Module not found')
    }

    return NextResponse.json({ data: module })
  } catch (e: unknown) {
    return err(500, getErrorMessage(e))
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await getClient()

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser()
    if (userErr || !user) return err(401, 'Unauthorized')

    // 首先检查模块是否存在
    const { data: existingModule, error: fetchError } = await supabase
      .from('content_module')
      .select('id, title')
      .eq('id', params.id)
      .single()

    if (fetchError || !existingModule) {
      return err(404, 'Module not found')
    }

    // 删除模块（级联删除相关条目）
    const { error: deleteError } = await supabase
      .from('content_module')
      .delete()
      .eq('id', params.id)

    if (deleteError) {
      return err(500, deleteError.message)
    }

    return NextResponse.json({
      message: 'Module deleted successfully',
      deleted_module: existingModule
    })
  } catch (e: unknown) {
    return err(500, getErrorMessage(e))
  }
}
