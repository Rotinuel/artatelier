// ─── GENERIC CRUD ROUTE FACTORY ───────────────────────────────────────────────
// Copy this file for each section and change TABLE + ORDER_COLUMN below.

import { getAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

const TABLE = 'blog_posts'          // ← change per section
const ORDER_COLUMN = 'created_at'   // ← change if needed

export async function GET() {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order(ORDER_COLUMN, { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req) {
  const supabase = getAdminClient()
  const body = await req.json()
  const { data, error } = await supabase.from(TABLE).insert([body]).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PUT(req) {
  const supabase = getAdminClient()
  const { id, ...updates } = await req.json()
  const { data, error } = await supabase.from(TABLE).update(updates).eq('id', id).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(req) {
  const supabase = getAdminClient()
  const { id } = await req.json()
  const { error } = await supabase.from(TABLE).delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
