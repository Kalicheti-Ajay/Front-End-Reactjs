import { apiRequest } from './api.js'
export async function getUsers({ signal } = {}) { return (await apiRequest('/users', { signal })).users }
export async function getUserById(id, { signal } = {}) { return (await apiRequest(`/users/${id}`, { signal })).user }
