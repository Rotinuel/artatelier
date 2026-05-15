'use client'

import { useState, useEffect } from 'react'

export default function CrudPage({ title, section, apiPath, fields, tableColumns }) {
  const EMPTY = Object.fromEntries(fields.map((f) => [f.key, '']))
  const [items, setItems] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    const res = await fetch(apiPath)
    const data = await res.json()
    if (data.data) setItems(data.data)
  }

  function openNew() { setEditing(null); setForm(EMPTY); setShowForm(true) }
  function openEdit(item) {
    setEditing(item.id)
    setForm(Object.fromEntries(fields.map((f) => [f.key, item[f.key] || ''])))
    setShowForm(true)
  }

  async function handleSave() {
    setLoading(true)
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { id: editing, ...form } : form

    const res = await fetch(apiPath, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    setLoading(false)

    if (data.error) {
      setFeedback({ type: 'error', text: data.error })
    } else {
      setFeedback({ type: 'success', text: editing ? 'Updated successfully' : 'Created successfully' })
      setShowForm(false)
      setEditing(null)
      setForm(EMPTY)
      fetchItems()
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item?')) return
    await fetch(apiPath, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setItems((prev) => prev.filter((i) => i.id !== id))
    setFeedback({ type: 'success', text: 'Deleted' })
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-[0.35em] text-stone-500 uppercase mb-2">{section}</p>
          <h1 className="text-4xl font-normal text-stone-100 tracking-wide">{title}</h1>
        </div>
        <button
          onClick={openNew}
          className="bg-stone-100 text-stone-900 text-[9px] tracking-[0.4em] uppercase px-5 py-2.5 hover:bg-white transition-colors"
        >
          + New
        </button>
      </div>

      {feedback && (
        <div className={`mb-5 px-4 py-3 text-xs tracking-widest border ${
          feedback.type === 'success'
            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900'
            : 'bg-red-950/40 text-red-400 border-red-900'
        }`}>
          {feedback.text}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-stone-800 w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-normal text-stone-200 tracking-wide mb-6">
              {editing ? `Edit ${title.replace(/s$/, '')}` : `New ${title.replace(/s$/, '')}`}
            </h2>
            <div className="space-y-4">
              {fields.map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-[9px] tracking-[0.35em] text-stone-500 uppercase mb-2">
                    {label}
                  </label>
                  {type === 'textarea' ? (
                    <textarea
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      rows={4}
                      className="w-full bg-stone-900 border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500 transition-colors resize-none"
                    />
                  ) : (
                    <input
                      type={type || 'text'}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-stone-100 text-stone-900 text-[9px] tracking-[0.4em] uppercase py-3 hover:bg-white transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditing(null) }}
                className="flex-1 border border-stone-800 text-stone-500 text-[9px] tracking-[0.4em] uppercase py-3 hover:border-stone-600 hover:text-stone-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-stone-900 border border-stone-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800">
              {tableColumns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-[9px] tracking-[0.35em] text-stone-500 uppercase font-normal"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-[9px] tracking-[0.35em] text-stone-500 uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/60">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={tableColumns.length + 1}
                  className="px-6 py-14 text-center text-stone-700 text-xs tracking-widest uppercase"
                >
                  No {title.toLowerCase()} yet
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-stone-800/40 transition-colors">
                  {tableColumns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 ${col.dim ? 'text-stone-500 text-xs' : 'text-stone-300'}`}
                    >
                      {col.render
                        ? col.render(item[col.key])
                        : item[col.key] || '—'}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right space-x-4">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-[9px] tracking-widest uppercase text-stone-600 hover:text-stone-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-[9px] tracking-widest uppercase text-stone-600 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
