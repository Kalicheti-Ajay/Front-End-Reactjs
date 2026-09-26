import './App.css'
import Projects from './components/Projects.jsx'

const projects = [
  {
    id: 1,
    name: 'GIIS Project',
    client: 'Singapore Government',
    status: 'In Progress',
    owner: 'Sandeep Metta',
    dateRange: '2022-01-01 to 2028-12-31',
    hours: 120,
    cost: 5000000,
  },
  {
    id: 2,
    name: 'BlazeUP Project',
    client: 'TerraLogic Software Solutions',
    status: 'Completed',
    owner: 'Renil Komtila',
    dateRange: '2024-02-15 to 2027-08-30',
    hours: 200,
    cost: 8000000,
  },
  {
    id: 3,
    name: 'Lollipop Project',
    client: 'TerraLogic Software Solutions',
    status: 'In Progress',
    owner: 'Asha Menon',
    dateRange: '2023-04-01 to 2026-10-15',
    hours: 140,
    cost: 62000000,
  },
  {
    id: 4,
    name: 'Caramelo Project',
    client: 'TerraLogic Software Solutions',
    status: 'Completed',
    owner: 'Lina Dsouza',
    dateRange: '2024-01-10 to 2027-06-20',
    hours: 180,
    cost: 71000000,
  },
]

function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Project Overview</p>
        <h1>Projects</h1>
        <p className="page-description">
          A quick look at project ownership, timelines, effort, and cost.
        </p>
      </header>

      <Projects projects={projects} />
    </main>
  )
}

export default App
