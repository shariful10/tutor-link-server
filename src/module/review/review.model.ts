import mongoose, { Schema } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>(
    {
        tutorId: {
            type: String,
            required: [true, 'Please provide your id'],
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        review: {
            type: String,
            required: [true, "Review cannot be empty"],
            trim: true,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
