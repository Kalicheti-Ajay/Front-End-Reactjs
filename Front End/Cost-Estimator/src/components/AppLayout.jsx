import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService.js'
import { PATHS } from '../utils/paths.js'
export default function AppLayout({ onLogout }) {
  const navigate = useNavigate()
  function signOut() { logout(); onLogout(); navigate(PATHS.login, { replace: true }) }
  return <div className="layout-shell"><aside className="sidebar"><div className="brand">Cost<span>Estimator</span></div><nav aria-label="Main navigation"><NavLink to={PATHS.projects}>Projects</NavLink><NavLink to={PATHS.users}>Users</NavLink><NavLink to={PATHS.createProject}>Create project</NavLink></nav><button className="logout-button" onClick={signOut}>Log out</button></aside><main className="layout-content"><Outlet /></main></div>
}
