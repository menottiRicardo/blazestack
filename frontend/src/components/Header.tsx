import { Link } from '@tanstack/react-router'
import { CreateIncidentModal } from '@/components/CreateIncidentModal'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/incidents">Incidents</Link>
        </div>
      </nav>
      
      <div className="flex items-center">
        <CreateIncidentModal triggerClassName="bg-blue-600 hover:bg-blue-700 text-white" />
      </div>
    </header>
  )
}
