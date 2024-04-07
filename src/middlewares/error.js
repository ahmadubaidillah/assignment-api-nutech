import { response } from '../utils/helpers.js'

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const { message } = err
  const url = req.originalUrl
  const { method } = req
  const { stack } = err

  // body-parser error
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json(response({ error: 'The request is not in a valid JSON format.' }))
  }

  console.error(new Date().toISOString(), `${statusCode} - ${message} - ${url} - ${method} - Stack: ${stack}`)

  res.status(statusCode).json(response({ error: 'Service unavailable.' }))
}

export default errorHandler
