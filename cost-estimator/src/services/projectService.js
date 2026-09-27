import { projects } from '../utils/mockData.js'

export const mockProjectState = {
  failRequest: false,
  returnEmpty: false,
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

export async function getProjects({ signal } = {}) {
  await waitForRequest(500, signal)

  if (mockProjectState.failRequest) {
    throw new Error('Projects request failed')
  }

  if (mockProjectState.returnEmpty) {
    return []
  }

  return [...projects]
}

export async function getProjectById(projectId, { signal } = {}) {
  await waitForRequest(250, signal)
  return projects.find((project) => project.id === projectId) ?? null
}
