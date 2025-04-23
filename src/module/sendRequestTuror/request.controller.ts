import { Request, Response } from "express"
import { requestService } from "./request.service"
import RequestTutor from "./request.model"

const createRequest = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tutorId, userEmail } = req.body;
    // console.log(tutorId)

    const existingRequest = await RequestTutor.findOne({ userEmail });
    if (existingRequest) {
       throw new Error("user all ready request")
    }
    const result = await requestService.sendRequestService(req.body)

    res.json({
      status: true,
      message: 'Request created successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getRequestsByTutorId = async (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId;
    const requests = await requestService.getRequestsForTutor(tutorId);

    if (!requests || requests.length === 0) {
       res.json({
        status: false,
        message: "No requests found for this tutor.",
      });
    }
    res.json({
      status: true,
      message: "Requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getRequestsDeleteByid = async (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId;
    console.log(tutorId)
    const requests = await requestService.deleteRequest(tutorId);
console.log(requests )

    res.json({
      status: true,
      message: "Requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getRequestsByStudentEmail = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;
    // console.log(userEmail)
    const requests = await requestService.getRequestsForStudent(userEmail);
    res.json({
      status: true,
      message: "Requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};


export const requestController = {
  createRequest,
  getRequestsByTutorId,
  getRequestsByStudentEmail,
  getRequestsDeleteByid
};

