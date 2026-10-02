import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers } from '../services/userService.js'
import { createProject } from '../services/projectService.js'
import { PATHS } from '../utils/paths.js'
export default function CreateProjectPage() {
  const [users, setUsers] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', client: '', owner: '', startDate: '', endDate: '', estimatedCost: '' })
  const navigate = useNavigate()
  useEffect(() => { const controller = new AbortController(); getUsers({ signal: controller.signal }).then(setUsers).catch((err) => { if (err.name !== 'AbortError') setError('Users could not be loaded. Please retry.') }).finally(() => { if (!controller.signal.aborted) setLoading(false) }); return () => controller.abort() }, [])
  function change(event) { setForm({ ...form, [event.target.name]: event.target.value }) }
  async function submit(event) {
    event.preventDefault(); setError(''); setSaving(true)
    try { const project = await createProject({ ...form, estimatedCost: Number(form.estimatedCost) }); navigate(PATHS.projectEstimate(project._id), { state: { created: true } }) }
    catch (err) { setError(err.message || 'Project could not be created.') } finally { setSaving(false) }
  }
  return <section className="form-page"><Link className="back-link" to={PATHS.projects}>← Projects</Link><header className="project-board-heading"><p className="board-label">New estimate</p><h1>Create project</h1><p className="board-subtitle">Add project details and assign an owner.</p></header>
    {loading ? <p>Loading owners…</p> : error && users.length === 0 ? <div className="empty-state error-state"><p>{error}</p><button className="retry-button" onClick={() => window.location.reload()}>Try again</button></div> : users.length === 0 ? <div className="empty-state"><p>No users are available to assign as a project owner. Create a user before creating a project.</p></div> : <form className="project-form" onSubmit={submit}>
      {error && <p role="alert" className="error-message">{error}</p>}
      <label>Project name<input name="name" required value={form.name} onChange={change} /></label><label>Client<input name="client" required value={form.client} onChange={change} /></label>
      <label>Owner<select name="owner" required value={form.owner} onChange={change}><option value="">Select an owner</option>{users.map((user) => <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>)}</select></label>
      <div className="form-row"><label>Start date<input type="date" name="startDate" required value={form.startDate} onChange={change} /></label><label>End date<input type="date" name="endDate" required value={form.endDate} onChange={change} /></label></div>
      <label>Estimated cost (INR)<input type="number" min="0" step="0.01" name="estimatedCost" required value={form.estimatedCost} onChange={change} /></label>
      <button className="primary-button" disabled={saving || loading || users.length === 0}>{saving ? 'Creating…' : 'Create project'}</button>
    </form>}</section>
}
