import express from 'express'

// CONTROLLERS ROUTES
import bannerController from '../controllers/public/banner.js'
import servicesController from '../controllers/public/services.js'

// BANNER
const bannerRouter = express.Router()
bannerRouter.get('/', bannerController.getBanners)

// SERVICES
const serviceRouter = express.Router()
serviceRouter.get('/', servicesController.getServices)

export default {
  bannerRouter,
  serviceRouter
}
