import multer, { diskStorage } from 'multer'
import { extname } from 'path'
import { response } from '../utils/helpers.js'

const maxSize = 1024 * 1024

const multerUpload = multer({
  storage: diskStorage({
    filename: (req, file, cb) => {
      console.log(file.name)
      const ext = extname(file.originalname)
      const filename = `${Date.now()}${ext}`
      cb(null, filename)
    },
    limits: maxSize
  }),

  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname)
    if (ext == '.png' || ext == '.jpg') {
      cb(null, true)
    } else {
      const error = {
        messasge: 'file must be JPG or PNG'
      }
      cb(error, false)
    }
  }
})

export default {
  upload: (req, res, next) => {
    const multerSingle = multerUpload.single('image')
    multerSingle(req, res, (err) => {
      if (err) {
        console.log(err)
        res
          .status(400)
          .json(
            response({ status: 102, message: 'Format Image tidak sesuai.' })
          )
      } else {
        next()
      }
    })
  }
}
