export function notFound(req, res) { res.status(404).json({ message: 'API route not found.' }) }
export function errorHandler(error, req, res, next) {
  console.error(error)
  if (res.headersSent) return next(error)
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) return res.status(400).json({ message: 'Request body must be valid JSON.' })
  if (error.name === 'ValidationError') return res.status(400).json({ message: Object.values(error.errors).map((item) => item.message).join(' ') })
  if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid identifier.' })
  return res.status(500).json({ message: 'An unexpected server error occurred.' })
}
