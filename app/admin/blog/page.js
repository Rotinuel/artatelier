import CrudPage from '@/components/admin/CrudPage'

const fields = [
  { key: 'title',        label: 'Title' },
  { key: 'published_at', label: 'Published Date', type: 'date' },
  { key: 'image_url',    label: 'Image URL' },
  { key: 'content',      label: 'Content', type: 'textarea' },
]

const tableColumns = [
  { key: 'title',        label: 'Title' },
  { key: 'published_at', label: 'Date', dim: true },
]

export default function BlogPage() {
  return (
    <CrudPage
      title="Blog Posts"
      section="Content"
      apiPath="/api/admin/blog"
      fields={fields}
      tableColumns={tableColumns}
    />
  )
}
