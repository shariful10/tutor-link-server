import { Request, Response } from 'express'
import RequestTutor from './request.model'
import { requestService } from './request.service'

const createRequest = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.body

    const existingRequest = await RequestTutor.findOne({ userEmail })
    if (existingRequest) {
      throw new Error('user all ready request')
    }
    const result = await requestService.sendRequestService(req.body)

    res.json({
      status: true,
      message: 'Request is created successfully!',
      data: result,
    })
  } catch (err) {
    res.json({
      status: false,
      message: 'Something went wrong',
      err,
    })
  }
}

const getRequestsByTutorId = async (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId
    const requests = await requestService.getRequestsForTutor(tutorId)

    if (!requests || requests.length === 0) {
      res.json({
        status: false,
        message: 'No requests found for this tutor.',
      })
    }
    res.json({
      status: true,
      message: 'Requests fetched successfully',
      data: requests,
    })
  } catch (err) {
    res.json({
      status: false,
      message: 'Something went wrong',
      err,
    })
  }
}

const getRequestsDeleteById = async (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId
    const requests = await requestService.deleteRequest(tutorId)

    res.json({
      status: true,
      message: 'Requests fetched successfully',
      data: requests,
    })
  } catch (err) {
    res.json({
      status: false,
      message: 'Something went wrong',
      err,
    })
  }
}

const getRequestsByStudentEmail = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params
    const requests = await requestService.getRequestsForStudent(userEmail)
    res.json({
      status: true,
      message: 'Requests fetched successfully',
      data: requests,
    })
  } catch (err) {
    res.json({
      status: false,
      message: 'Something went wrong',
      err,
    })
  }
}

export const requestController = {
  createRequest,
  getRequestsByTutorId,
  getRequestsByStudentEmail,
  getRequestsDeleteById,
}
