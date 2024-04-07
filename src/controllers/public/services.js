import Models from '../../db/mysql/models/index.js'
import { catchAsync, response } from '../../utils/helpers.js'

const { Services } = Models

export default {
  getServices: catchAsync(async (req, res) => {
    const services = await Services.findAll()

    const data = services.map((service) => ({
      service_code: service.serviceCode,
      service_name: service.serviceName,
      service_icon: service.serviceIcon,
      service_tarif: service.serviceTarif
    }))

    res.status(200).json(
      response({
        status: 0,
        message: 'Sukses',
        data: data
      })
    )
  })
}
