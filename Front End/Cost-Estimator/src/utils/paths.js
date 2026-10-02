export const PATHS = {
  login: '/login', dashboard: '/', projects: '/projects', createProject: '/projects/new',
  project: (id) => `/projects/${id}`, projectOverview: (id) => `/projects/${id}/overview`,
  projectEstimate: (id) => `/projects/${id}/estimate`, projectTeam: (id) => `/projects/${id}/team`,
  users: '/users', user: (id) => `/users/${id}`,
}
export const ROUTES = {
  root: '/', login: PATHS.login, projects: PATHS.projects, createProject: PATHS.createProject,
  project: '/projects/:projectId', projectTab: '/projects/:projectId/:tab',
  users: PATHS.users, user: '/users/:userId',
}
