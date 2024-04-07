import Models from '../../db/mysql/models/index.js'
import { catchAsync, response } from '../../utils/helpers.js'

const { Banners } = Models

export default {
  getBanners: catchAsync(async (req, res) => {
    const banners = await Banners.findAll()

    const data = banners.map((banner) => ({
      banner_name: banner.bannerName,
      banner_image: banner.bannerImage,
      description: banner.description
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
