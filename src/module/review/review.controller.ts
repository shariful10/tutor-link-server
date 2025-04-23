import { Request, Response } from "express";
import { reviewService } from "./review.service";


const createReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.createReview(req.body);
        // console.log(review,"dataaaa")
        res.status(201).json({ success: true, data: review });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create review", error });
    }
};

const getreviweTutorId = async (req: Request, res: Response) => {
    try {
        const tutorId = req.params.tutorId;
        const requests = await reviewService.getReviewTutor(tutorId);
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


export const reviewController = {
    createReview,
    getreviweTutorId
};


