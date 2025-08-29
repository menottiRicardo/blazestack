import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CreateIncidentModal } from '@/components/CreateIncidentModal'
import logo from '@/logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p className="mb-8">
          Welcome to BlazeStack Incident Management
        </p>
        
        <div className="flex flex-col gap-4 mb-8">
          <Link to="/incidents">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
              View Incidents Dashboard
            </Button>
          </Link>
          
          <CreateIncidentModal 
            triggerText="Create New Incident"
            triggerClassName="bg-blue-600 hover:bg-blue-700 text-white"
          />
        </div>
        
        <div className="flex flex-col gap-2 text-base">
          <a
            className="text-[#61dafb] hover:underline"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a
            className="text-[#61dafb] hover:underline"
            href="https://tanstack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn TanStack
          </a>
        </div>
      </header>
    </div>
  )
}
