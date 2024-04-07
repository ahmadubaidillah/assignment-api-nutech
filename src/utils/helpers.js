import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import config from '../config.js'

const hash = (string, salt = '') => {
  const hashSalt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(string + salt, hashSalt)
  return hash
}

export const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

export const decodeToken = (token) => {
  try {
    return jwt.verify(token, config.jwt_secret)
  } catch (error) {
    console.warn(new Date(), 'Failed decode token: ', error)
    return null
  }
}

export const generateRandomString = (size, mode = '111') => {
  // '100': [0-9]
  // '010': [A-B]
  // '101': [0-9] + [a-b]
  // '111': [0-9] + [A-B] + [a-b]
  const r = (n) => Math.floor(Math.random() * n)
  const m = [...mode]
    .map((v, i) => parseInt(v, 10) * (i + 1))
    .filter(Boolean)
    .map((v) => v - 1)
  return [...new Array(size)].reduce(
    (a) =>
      a +
      String.fromCharCode([48 + r(10), 65 + r(26), 97 + r(26)][m[r(m.length)]]),
    ''
  )
}

export const getRandomNumber = (length) => {
  let randomNumber = ''
  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10)
  }
  return randomNumber
}

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const hashPassword = (password) => {
  return hash(password, config.salt_pass)
}

export const response = (result) => {
  if (result.error) {
    return {
      status: result.status,
      message: result.error,
      data: null
    }
  } else {
    return {
      status: result.status,
      message: result.message ?? null,
      data: result.data ?? null,
      meta: result.meta ?? undefined
    }
  }
}
