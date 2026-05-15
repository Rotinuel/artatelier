"use server"

import CrudPage from '@/components/admin/CrudPage'

const fields = [
  { key: 'author', label: 'Author Name' },
  { key: 'company', label: 'Company' },
  { key: 'quote', label: 'Quote', type: 'textarea' },
]


export default function TestimonialsPage() {
  const tableColumns = [
    { key: 'author', label: 'Author' },
    { key: 'company', label: 'Company', dim: true },
    {
      key: 'quote',
      label: 'Quote',
      dim: true,
      render: (v) => (v ? v.slice(0, 60) + (v.length > 60 ? '…' : '') : '—'),
    },
  ]
  return (
    <CrudPage
      title="Testimonials"
      section="Social Proof"
      apiPath="/api/admin/testimonials"
      fields={fields}
      tableColumns={tableColumns}
    />
  )
}
