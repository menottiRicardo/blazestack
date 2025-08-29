import type { Incident } from '@/types/incident'
import { INCIDENT_TYPES } from '@/types/incident'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface IncidentCardProps {
  incident: Incident
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const incidentType = INCIDENT_TYPES.find(
    (type) => type.value === incident.incident_type,
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fire':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medical':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'security':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'other':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {incident.title}
          </CardTitle>
          <Badge
            variant="outline"
            className={`ml-2 flex-shrink-0 ${getTypeColor(incident.incident_type)}`}
          >
            {incidentType?.label || incident.incident_type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {incident.image && (
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Image:</span>
            </div>
            {incident.image.includes('incident-') && (
              <img
                src={`http://localhost:8000/uploads/${incident.image}`}
                alt="Incident"
                className="w-24 h-24 object-cover rounded-md border mx-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )}
          </div>
        )}

        {incident.description && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {incident.description}
          </p>
        )}

        {incident.location && (
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium">Location:</span>
            <span className="ml-1 truncate">{incident.location}</span>
          </div>
        )}

        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Created: {formatDate(incident.created_at)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
