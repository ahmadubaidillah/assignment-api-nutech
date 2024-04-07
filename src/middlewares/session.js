import Models from '../db/mysql/models/index.js'
import { catchAsync, response } from '../utils/helpers.js'
import jwt from '../utils/jwt.js'

const { Sessions, Users } = Models

const SessionValidator = (roles = [], route) =>
  catchAsync(async (req, res, next) => {
    const accessToken = req.cookies.access_token
    const refreshToken = req.cookies.refresh_token

    if (!accessToken) {
      return res.status(401).send(
        response({
          status: 108,
          error: 'Token tidak valid atau kadaluwarsa.'
        })
      )
    }

    const decodeData = jwt.decode(accessToken)
    if (!decodeData || !decodeData?.userUid || !decodeData?.sessionUid) {
      return res.status(401).send(
        response({
          status: 108,
          error: 'Token tidak valid atau kadaluwarsa.'
        })
      )
    }

    const userSession = await Sessions.findOne({
      where: {
        uid: decodeData.sessionUid,
        userUid: decodeData.userUid,
        token: refreshToken,
        valid: 1
      },
      attributes: ['id']
    })
    if (!userSession) {
      return res.status(440).send(
        response({
          status: 108,
          error: 'Token tidak valid atau kadaluwarsa.'
        })
      )
    }

    const userData = await Users.findOne({
      where: { uid: decodeData.userUid }
    })

    req.userUid = decodeData.userUid
    req.user = userData
    req.session = userSession
    next()
  })

export default SessionValidator
