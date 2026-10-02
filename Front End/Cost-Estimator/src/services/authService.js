import { apiRequest, tokenStore } from './api.js'
export async function login(credentials) {
  const result = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
  tokenStore.set(result.token)
  return result.user
}
export function logout() { tokenStore.clear() }
export function hasToken() { return Boolean(tokenStore.get()) }
