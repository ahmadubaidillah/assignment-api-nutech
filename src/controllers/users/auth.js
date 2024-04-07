import bcrypt from 'bcryptjs'
import Models from '../../db/mysql/models/index.js'
import {
  catchAsync,
  response,
  generateRandomString
} from '../../utils/helpers.js'
import jwt from '../../utils/jwt.js'

const { Users, Sessions } = Models

const accessTokenCookieOptions = {
  maxAge: 12 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'none',
  secure: true
}

const refreshTokenCookieOptions = {
  maxAge: 12 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'none',
  secure: true
}

const handleSignInSession = async (user) => {
  const sessionData = {
    userId: user.id,
    token: generateRandomString(100)
  }

  // eslint-disable-next-line no-unused-vars
  const [session, created] = await Sessions.findOrCreate({
    where: {
      userId: sessionData.userId,
      valid: 1
    },
    defaults: sessionData
  })

  let newSession = null
  if (!created) {
    // If not logged out (previous session exist), logout the previous session. This is to prevent multiple sessions
    newSession = await Sessions.create(sessionData)
    await session.update({ valid: 0 })
  } else {
    newSession = session
  }

  // generate access token
  const accessToken = jwt.sign({
    userId: user.id,
    sessionId: newSession.id
  })

  return { accessToken, refreshToken: newSession.token }
}

const handleSignIn = async (user, req, res) => {
  const tokenSession = await handleSignInSession(user)

  // remove confidential data
  user.dataValues.password = undefined

  // set refresh token at cookie
  res.cookie(
    'access_token',
    tokenSession.accessToken,
    accessTokenCookieOptions
  )
  res.cookie(
    'refresh_token',
    tokenSession.refreshToken,
    refreshTokenCookieOptions
  )

  const responseData = {
    token: tokenSession.accessToken
  }

  return res.status(200).json(
    response({
      status: 0,
      message: 'Login Sukses.',
      data: responseData
    })
  )
}

export default {
  signUp: catchAsync(async (req, res) => {
    const { email, password, first_name, last_name } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json(
        response({
          status: 102,
          error: 'Paramter email tidak sesuai format.'
        })
      )
    }

    await Users.create({
      email,
      password,
      firstName: first_name,
      lastName: last_name
    })

    res
      .status(200)
      .json(
        response({ status: 0, message: 'Regristasi Berhasil Silahkan Login' })
      )
  }),

  signIn: catchAsync(async (req, res) => {
    const { email, password } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json(
        response({
          status: 102,
          error: 'Paramter email tidak sesuai format.'
        })
      )
    }

    const user = await Users.scope(['defaultScope', 'withPassword']).findOne({
      where: { email }
    })
    if (!user) {
      return res
        .status(401)
        .json(
          response({ status: 103, error: 'Username atau password salah.' })
        )
    }

    // compare returned password with user password input
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json(
          response({ status: 103, error: 'Username atau password salah.' })
        )
    }

    handleSignIn(user, req, res)
  }),

  signOut: catchAsync(async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    if (refreshToken) {
      const session = await Sessions.scope('all').findOne({
        where: { token: refreshToken },
        include: [
          {
            model: Users.scope('all'),
            as: 'user',
            attributes: ['id']
          }
        ]
      })
      if (session) {
        await session.update({ valid: 0 })
      }
    }
    res.cookie('access_token', '', { ...accessTokenCookieOptions, maxAge: 0 })
    res.cookie('refresh_token', '', {
      ...refreshTokenCookieOptions,
      maxAge: 0
    })
    return res
      .status(200)
      .json(response({ status: 0, message: 'Logout Berhasil.' }))
  })
}
