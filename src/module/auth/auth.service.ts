import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'

const registerIntoDb = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}

const loginIntoDb = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select('+password')

  if (!user) {
    throw new Error('user is not found')
  }

  const userSatatus = user?.userStatus

  if (userSatatus === 'inactive') {
    throw new Error('user is Inactive')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )
  if (!isPasswordMatched) {
    throw new Error('Wrong password !! Try again')
  }

  //create token and sent to the  client
  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    id: user.id,
  }

  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '1d' })

  const veryfiUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    id: user?.id,
  }

  return { token, veryfiUser }
}

export const AuthServer = {
  registerIntoDb,
  loginIntoDb,
}
