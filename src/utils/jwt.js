import jwt from 'jsonwebtoken'
import config from '../config.js'

const sign = (payload) => {
  return jwt.sign(payload, config.jwt_secret, {
    expiresIn: '12h'
  })
}

const decode = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret)
    return decoded
  } catch (error) {
    return null
  }
}

export default {
  sign,
  decode
}
