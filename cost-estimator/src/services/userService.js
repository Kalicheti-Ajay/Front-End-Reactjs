import { users } from '../utils/mockData.js'

export const mockUserState = {
  failRequest: false,
}

function createAbortError() {
  const error = new Error('Request aborted')
  error.name = 'AbortError'
  return error
}

function waitForRequest(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(createAbortError())
      return
    }

    const timeoutId = setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort)
      resolve()
    }, ms)

    function handleAbort() {
      clearTimeout(timeoutId)
      signal?.removeEventListener('abort', handleAbort)
      reject(createAbortError())
    }

    signal?.addEventListener('abort', handleAbort, { once: true })
  })
}

export async function getUsers({ signal } = {}) {
  await waitForRequest(500, signal)

  if (mockUserState.failRequest) {
    throw new Error('Users request failed')
  }

  return [...users]
}

export async function getUserById(userId, { signal } = {}) {
  await waitForRequest(250, signal)
  return users.find((user) => user.id === userId) ?? null
}
