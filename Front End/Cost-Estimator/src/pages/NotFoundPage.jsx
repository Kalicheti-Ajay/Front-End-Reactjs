import { Link } from 'react-router-dom'
import { PATHS } from '../utils/paths.js'
export default function NotFoundPage() { return <main className="state-page detail-page"><h1>Page Not Found</h1><p>This address does not match a page in the application.</p><Link className="primary-button inline-button" to={PATHS.projects}>Go to Dashboard</Link></main> }
