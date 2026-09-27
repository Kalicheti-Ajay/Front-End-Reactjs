import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProjectOverviewPage from './pages/ProjectOverviewPage.jsx'
import UserDetailPage from './pages/UserDetailPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectOverviewPage />} />
        <Route path="/projects" element={<ProjectOverviewPage />} />
        <Route path="/users/:userId" element={<UserDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
