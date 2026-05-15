import CrudPage from '@/components/admin/CrudPage'

const fields = [
  { key: 'title',       label: 'Service Title' },
  { key: 'icon',        label: 'Icon (symbol or emoji)' },
  { key: 'description', label: 'Description', type: 'textarea' },
]

const tableColumns = [
  { key: 'title', label: 'Service' },
  { key: 'icon',  label: 'Icon', dim: true },
]

export default function ServicesPage() {
  return (
    <CrudPage
      title="Services"
      section="Offerings"
      apiPath="/api/admin/services"
      fields={fields}
      tableColumns={tableColumns}
    />
  )
}
