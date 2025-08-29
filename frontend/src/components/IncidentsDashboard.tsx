import { useState } from 'react'
import { FileIcon, PlusIcon, RefreshCwIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { IncidentCard } from '@/components/IncidentCard'
import { CreateIncidentModal } from '@/components/CreateIncidentModal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { incidentsApi } from '@/api/incidents'

export function IncidentsDashboard() {
  const [page, setPage] = useState(1)
  const limit = 10

  const {
    data: incidentsData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['incidents', page],
    queryFn: () => incidentsApi.list(page, limit),
    staleTime: 30000, // 30 seconds
  })

  const handleRefresh = () => {
    refetch()
  }

  const handleNextPage = () => {
    if (incidentsData && page < incidentsData.totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Incidents Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-48 animate-pulse bg-gray-100" />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Incidents Dashboard</h1>
        </div>

        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Incidents
          </h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error
              ? error.message
              : 'Failed to load incidents'}
          </p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </Card>
      </div>
    )
  }

  const incidents = incidentsData?.incidents || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Incidents Dashboard</h1>
          <p className="text-gray-600 mt-2">
            {incidentsData
              ? `Showing ${incidents.length} of ${incidentsData.total} incidents`
              : 'Loading incidents...'}
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleRefresh}
            variant="outline"
            disabled={isFetching}
          >
            <RefreshCwIcon
              className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>

          <CreateIncidentModal
            triggerText="Create Incident"
            triggerClassName="bg-blue-600 hover:bg-blue-700 text-white"
          />
        </div>
      </div>

      {incidents.length === 0 ? (
        <Card className="p-16 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <FileIcon className="w-10 h-10 text-gray-400" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Incidents Yet
            </h2>

            {/* Action button */}
            <CreateIncidentModal
              trigger={
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Create Your First Incident
                </Button>
              }
            />
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {incidents.map((incident) => (
              <IncidentCard key={incident._id} incident={incident} />
            ))}
          </div>

          {/* Pagination */}
          {incidentsData && incidentsData.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={handlePrevPage}
                disabled={page === 1}
                variant="outline"
              >
                Previous
              </Button>

              <span className="text-sm text-gray-600">
                Page {page} of {incidentsData.totalPages}
              </span>

              <Button
                onClick={handleNextPage}
                disabled={page >= incidentsData.totalPages}
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
