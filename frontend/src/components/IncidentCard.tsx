import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import type { ApiError } from '@/api/incidents'
import type { Incident } from '@/types/incident'
import { incidentsApi } from '@/api/incidents'
import { INCIDENT_TYPES } from '@/types/incident'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'


interface IncidentCardProps {
  incident: Incident
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const queryClient = useQueryClient()
  
  const incidentType = INCIDENT_TYPES.find(
    (type) => type.value === incident.incident_type,
  )

  const deleteIncidentMutation = useMutation({
    mutationFn: incidentsApi.delete,
    onSuccess: () => {
      // Invalidate incidents list to refetch data
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
      toast.success('Incident deleted successfully!')
    },
    onError: (error: ApiError) => {
      console.error('Error deleting incident:', error)
      toast.error(error.message || 'Failed to delete incident. Please try again.')
    },
  })

  const handleDelete = () => {
    deleteIncidentMutation.mutate(incident._id)
  }

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

  const getStripeColor = (type: string) => {
    switch (type) {
      case 'fire':
        return 'bg-red-500'
      case 'medical':
        return 'bg-blue-500'
      case 'security':
        return 'bg-yellow-500'
      case 'other':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fire':
        return '🔥'
      case 'medical':
        return '🚑'
      case 'security':
        return '🚨'
      case 'other':
        return '⚠️'
      default:
        return '⚠️'
    }
  }

  const getStatusDotColor = (type: string) => {
    switch (type) {
      case 'fire':
        return 'bg-red-400'
      case 'medical':
        return 'bg-blue-400'
      case 'security':
        return 'bg-yellow-400'
      case 'other':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <Card className="group h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50">
      {/* Top stripe with incident type color */}
      <div className={`h-1 w-full ${getStripeColor(incident.incident_type)}`} />
      
      {/* Delete button - positioned absolutely */}
      <div className="absolute top-10 right-2 z-10">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full cursor-pointer"
              disabled={deleteIncidentMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Incident</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this incident? This action cannot be undone.
                <br />
                <br />
                <strong>"{incident.title}"</strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
                disabled={deleteIncidentMutation.isPending}
              >
                {deleteIncidentMutation.isPending ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          {/* Incident type icon */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(incident.incident_type)}`}>
            <span className="text-lg">{getTypeIcon(incident.incident_type)}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className={`text-xs ${getTypeColor(incident.incident_type)} border-current`}
              >
                {incidentType?.label || incident.incident_type}
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-900 leading-tight">
              {incident.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {/* Image section - redesigned */}
        {incident.image && incident.image.includes('incident-') && (
          <div className="relative">
            <img
              src={`http://localhost:8000/uploads/${incident.image}`}
              alt="Incident"
              className="w-full h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg" />
          </div>
        )}

        {/* Description */}
        {incident.description && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
              {incident.description}
            </p>
          </div>
        )}

        {/* Location with icon */}
        {incident.location && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate font-medium">{incident.location}</span>
          </div>
        )}

        {/* Footer with timestamp */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatDate(incident.created_at)}</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${getStatusDotColor(incident.incident_type)}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
