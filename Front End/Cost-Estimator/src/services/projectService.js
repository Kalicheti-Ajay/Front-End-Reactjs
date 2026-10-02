import { apiRequest } from './api.js'
export async function getProjects({ signal } = {}) { return (await apiRequest('/projects', { signal })).projects }
export async function getProjectById(id, { signal } = {}) { return (await apiRequest(`/projects/${id}`, { signal })).project }
export async function createProject(project) { return (await apiRequest('/projects', { method: 'POST', body: JSON.stringify(project) })).project }
