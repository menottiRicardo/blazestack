import { createFileRoute } from '@tanstack/react-router'
import { IncidentsDashboard } from '@/components/IncidentsDashboard'

export const Route = createFileRoute('/')({
  component: IncidentsPage,
})

function IncidentsPage() {
  return <IncidentsDashboard />
}
