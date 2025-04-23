import { IRequest } from "./request.interface"
import RequestTutor from "./request.model"


const sendRequestService = async ({ tutorId, userEmail }: IRequest) => {
    try {
        if (!tutorId || !userEmail) {
          throw new Error("Invalid data provided");
        }
    
        const result = await RequestTutor.create({ tutorId, userEmail });
        return result;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new Error("Error while creating the request: ");
      }

    }

    const getRequestsForTutor = async (tutorId: string) => {
      const requests = await RequestTutor.find({ tutorId }).exec();
      return requests;
    };

    const deleteRequest = async (tutorId: string) => {
      const requests = await RequestTutor.findOneAndDelete({tutorId});
      return requests;
    };

    const getRequestsForStudent = async (userEmail: string) => {
      try {
        const requests = await RequestTutor.find({ userEmail }).exec();
        // console.log(requests, "email");
        return requests;
      } catch (error) {
        console.error("Error fetching requests:", error);
        throw new Error("Failed to fetch requests for the student.");
      }
    };

export const requestService = {
    sendRequestService,
    getRequestsForTutor,
    getRequestsForStudent,
    deleteRequest
}