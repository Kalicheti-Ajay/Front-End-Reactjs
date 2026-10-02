import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../services/userService.js'
import { PATHS } from '../utils/paths.js'
export default function UsersPage() {
  const [users, setUsers] = useState([]); const [error, setError] = useState(''); const [retry, setRetry] = useState(0); const [loading, setLoading] = useState(true)
  useEffect(() => { const controller = new AbortController(); getUsers({ signal: controller.signal }).then(setUsers).catch((err) => { if (err.name !== 'AbortError') setError('Users could not be loaded.') }).finally(() => { if (!controller.signal.aborted) setLoading(false) }); return () => controller.abort() }, [retry])
  return <section className="users-page"><header className="project-board-heading"><p className="board-label">Directory</p><h1>Users</h1></header>{loading ? <p>Loading users…</p> : error ? <div className="empty-state error-state"><p>{error}</p><button className="retry-button" onClick={() => { setError(''); setLoading(true); setRetry((n) => n + 1) }}>Try again</button></div> : <div className="users-grid">{users.map((user) => <Link key={user._id} className="user-list-card" to={PATHS.user(user._id)}><strong>{user.firstName} {user.middleName} {user.lastName}</strong><span>{user.role}</span><span>{user.branch}</span></Link>)}</div>}</section>
}
