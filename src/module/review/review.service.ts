import { IReview } from "./review.interface";
import Review from "./review.model";

const createReview = async (payload: IReview): Promise<IReview> => {
  const result = await Review.create(payload);
  return result;
};


const getReviewTutor = async (tutorId: string) => {
  const requests = await Review.find({ tutorId }).exec();
  return requests;
};


export const reviewService = {
  createReview,
  getReviewTutor
};


