import { response } from '../utils/helpers.js'

// MIDDLEWARES

// ROUTES
import UsersRouter from './user.js'
import PublicRouter from './public.js'

// ROUTINGS
const Route = (app) => {
  // USER
  app.use('/auth', UsersRouter.authRouter)
  app.use('/profile', UsersRouter.profileRouter)
  app.use('/balance', UsersRouter.balanceRouter)
  app.use('/transaction', UsersRouter.transactionRouter)

  // BANNER
  app.use('/banner', PublicRouter.bannerRouter)
  app.use('/service', PublicRouter.serviceRouter)

  // catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).json(response({ error: 'No such route exists' }))
  })
}

export default Route
