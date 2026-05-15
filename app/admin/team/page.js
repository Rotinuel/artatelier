import CrudPage from '@/components/admin/CrudPage'

const fields = [
  { key: 'name',      label: 'Full Name' },
  { key: 'role',      label: 'Role / Title' },
  { key: 'image_url', label: 'Photo URL' },
  { key: 'bio',       label: 'Bio', type: 'textarea' },
]

const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role', dim: true },
]

export default function TeamPage() {
  return (
    <CrudPage
      title="Team Members"
      section="People"
      apiPath="/api/admin/team"
      fields={fields}
      tableColumns={tableColumns}
    />
  )
}
