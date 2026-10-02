import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login } from '../services/authService.js'
import { PATHS } from '../utils/paths.js'
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const location = useLocation(); const navigate = useNavigate()
  async function submit(event) {
    event.preventDefault(); setError(''); setLoading(true)
    try { const user = await login({ email, password }); onLogin(user); const target = location.state?.from; navigate(target ? `${target.pathname}${target.search || ''}${target.hash || ''}` : PATHS.projects, { replace: true }) }
    catch { setError('Invalid credentials or unable to sign in.') } finally { setLoading(false) }
  }
  return <main className="login-page"><form className="login-card" onSubmit={submit}><p className="board-label">Cost Estimator</p><h1>Welcome back</h1><p>Sign in to manage projects and estimates.</p>
    {error && <p className="error-message" role="alert">{error}</p>}<label>Email<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label><label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label><button className="primary-button" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
  </form></main>
}
