import express from 'express'

// MIDDLEWAREs
import SessionValidator from '../middlewares/session.js'
import upload from '../middlewares/upload.js'

// CONTROLLERS ROUTES
import authController from '../controllers/users/auth.js'
import profileController from '../controllers/users/profile.js'
import balanceController from '../controllers/users/balance.js'
import transactionController from '../controllers/users/transaction.js'

// AUTH
const authRouter = express.Router()
authRouter.post('/sign-up', authController.signUp)
authRouter.post('/sign-in', authController.signIn)
authRouter.post('/sign-out', authController.signOut)

// PROFILE
const profileRouter = express.Router()
profileRouter.use(SessionValidator())
profileRouter.get('/', profileController.getProfile)
profileRouter.put('/update', profileController.updateProfile)
profileRouter.post(
  '/image',
  upload.upload,
  profileController.uploadImageProfile
)

// BALANCE
const balanceRouter = express.Router()
balanceRouter.use(SessionValidator())
balanceRouter.get('/', balanceController.getBalance)
balanceRouter.post('/top-up', balanceController.topUp)

// TRANSACTION
const transactionRouter = express.Router()
transactionRouter.use(SessionValidator())
transactionRouter.get('/history', transactionController.getTransaction)
transactionRouter.post('/', transactionController.transaction)

export default {
  authRouter,
  profileRouter,
  balanceRouter,
  transactionRouter
}
