"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("./review.service");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_service_1.reviewService.createReview(req.body);
        // console.log(review,"dataaaa")
        res.status(201).json({ success: true, data: review });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to create review", error });
    }
});
const getreviweTutorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.params.tutorId;
        const requests = yield review_service_1.reviewService.getReviewTutor(tutorId);
        res.json({
            status: true,
            message: "Requests fetched successfully",
            data: requests,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.reviewController = {
    createReview,
    getreviweTutorId
};
