'use strict'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import config from './src/config.js'
import corsMiddleware from './src/middlewares/cors.js'
import errorHandler from './src/middlewares/error.js'
import route from './src/routes/v1.js'

// EXPRESS
const app = express()
app.set('trust proxy', true)

// LOGGER
if (config.env !== 'production') app.use(morgan('dev'))

// I/O
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// COOKIE PARSER
app.use(cookieParser())

// HEADER HELMET
app.use(helmet())

// CORS
app.use(corsMiddleware)
app.options('*', cors(corsMiddleware))

// ROUTES
app.route = route(app)

// ERROR HANDLER
app.use(errorHandler)

// SERVER
app.listen(config.port, () => {
  console.info(`Server listening on port ${config.port}`)
})
