import { Router } from "express";
import { reviewController } from "./review.controller";


const reviewRouter = Router()

reviewRouter.post('/review', reviewController.createReview)
reviewRouter.get('/review/:tutorId', reviewController.getreviweTutorId)



export default reviewRouter