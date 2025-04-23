import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServer } from './auth.service'

const register = catchAsync(async (req, res) => {
  const result = await AuthServer.registerIntoDb(req.body)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'register is successfully',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const result = await AuthServer.loginIntoDb(req.body)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.ACCEPTED,
    token: result.token,
    message: 'User is login successfully!',
    data: result.veryfiUser,
  })
})

export const AuthController = {
  register,
  login,
}
