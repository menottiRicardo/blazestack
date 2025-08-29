import { createFileRoute } from '@tanstack/react-router'
import { IncidentsDashboard } from '@/components/IncidentsDashboard'

export const Route = createFileRoute('/incidents')({
  component: IncidentsPage,
})

function IncidentsPage() {
  return <IncidentsDashboard />
}
