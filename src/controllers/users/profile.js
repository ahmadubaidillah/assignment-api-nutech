import Models from '../../db/mysql/models/index.js'
import { catchAsync, response } from '../../utils/helpers.js'
import cloudinary from '../../utils/cloudinary.js'

const { Users } = Models

export default {
  getProfile: catchAsync(async (req, res) => {
    const userId = req.userId
    const userData = await Users.findOne({
      where: { id: userId }
    })

    const data = {
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      profile_image: userData.profileImage
    }

    res
      .status(200)
      .send(response({ status: 0, message: 'sukses', data: data }))
  }),

  updateProfile: catchAsync(async (req, res) => {
    const userId = req.userId
    const { first_name, last_name } = req.body

    const userData = await Users.findOne({
      where: { id: userId }
    })

    const firstName = first_name
    const lastName = last_name

    const data = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName })
    }

    await userData.update(data)

    const datas = {
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      profile_image: userData.profileImage
    }

    res.status(200).send(
      response({
        status: 0,
        message: 'Update Pofile berhasil',
        data: datas
      })
    )
  }),

  uploadImageProfile: catchAsync(async (req, res) => {
    const userId = req.userId
    const images = await cloudinary.uploader.upload(req.file.path)
    const image = images.url

    const userData = await Users.findOne({
      where: { id: userId }
    })

    await userData.update({ profileImage: image })

    const datas = {
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      profile_image: userData.profileImage
    }

    res.status(200).send(
      response({
        status: 0,
        message: 'Update Pofile berhasil',
        data: datas
      })
    )
  })
}
