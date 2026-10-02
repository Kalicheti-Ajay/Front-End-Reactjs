import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ProjectOverviewPage from './pages/ProjectOverviewPage.jsx'
import UserDetailPage from './pages/UserDetailPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AppLayout from './components/AppLayout.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { hasToken } from './services/authService.js'
import { PATHS, ROUTES } from './utils/paths.js'
import CreateProjectPage from './pages/CreateProjectPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import UsersPage from './pages/UsersPage.jsx'

function Guard({ authenticated, children }) {
  const location = useLocation()
  return authenticated ? children : <Navigate to={PATHS.login} replace state={{ from: location }} />
}
function RoutedApp() {
  const [authenticated, setAuthenticated] = useState(hasToken)
  useEffect(() => {
    const unauthorized = () => setAuthenticated(false)
    window.addEventListener('auth:unauthorized', unauthorized)
    return () => window.removeEventListener('auth:unauthorized', unauthorized)
  }, [])
  return <Routes>
    <Route path={ROUTES.login} element={authenticated ? <Navigate to={PATHS.projects} replace /> : <LoginPage onLogin={() => setAuthenticated(true)} />} />
    <Route element={<Guard authenticated={authenticated}><AppLayout onLogout={() => setAuthenticated(false)} /></Guard>}>
      <Route path={ROUTES.root} element={<Navigate to={PATHS.projects} replace />} />
      <Route path={ROUTES.projects} element={<ProjectOverviewPage />} />
      <Route path={ROUTES.createProject} element={<CreateProjectPage />} />
      <Route path={ROUTES.project} element={<ProjectPage />} />
      <Route path={ROUTES.projectTab} element={<ProjectPage />} />
      <Route path={ROUTES.users} element={<UsersPage />} />
      <Route path={ROUTES.user} element={<UserDetailPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
}
export default function App() { return <BrowserRouter><RoutedApp /></BrowserRouter> }
