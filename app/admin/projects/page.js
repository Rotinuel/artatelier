import CrudPage from '@/components/admin/CrudPage'

const fields = [
  { key: 'title',       label: 'Project Title' },
  { key: 'category',    label: 'Category' },
  { key: 'description', label: 'Description', type: 'textarea' },
]

const tableColumns = [
  { key: 'title',    label: 'Title' },
  { key: 'category', label: 'Category', dim: true },
]

export default function ProjectsPage() {
  return (
    <CrudPage
      title="Projects"
      section="Portfolio"
      apiPath="/api/admin/projects"
      fields={fields}
      tableColumns={tableColumns}
    />
  )
}
