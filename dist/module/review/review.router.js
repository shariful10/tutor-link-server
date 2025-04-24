"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const reviewRouter = (0, express_1.Router)();
reviewRouter.post('/review', review_controller_1.reviewController.createReview);
reviewRouter.get('/review/:tutorId', review_controller_1.reviewController.getreviweTutorId);
exports.default = reviewRouter;
