/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRequest } from './request.interface'
import RequestTutor from './request.model'

const sendRequestService = async ({ tutorId, userEmail }: IRequest) => {
  try {
    if (!tutorId || !userEmail) {
      throw new Error('Invalid data provided')
    }

    const result = await RequestTutor.create({ tutorId, userEmail })
    return result
  } catch (err: any) {
    throw new Error(err.message || 'Failed to send request!')
  }
}

const getRequestsForTutor = async (tutorId: string) => {
  const requests = await RequestTutor.find({ tutorId }).exec()
  return requests
}

const deleteRequest = async (tutorId: string) => {
  const requests = await RequestTutor.findOneAndDelete({ tutorId })
  return requests
}

const getRequestsForStudent = async (userEmail: string) => {
  try {
    const requests = await RequestTutor.find({ userEmail }).exec()
    return requests
  } catch (err: any) {
    throw new Error(err.message || 'Failed to get requests!')
  }
}

export const requestService = {
  sendRequestService,
  getRequestsForTutor,
  getRequestsForStudent,
  deleteRequest,
}
