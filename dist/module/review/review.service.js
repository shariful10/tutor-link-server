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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const review_model_1 = __importDefault(require("./review.model"));
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.create(payload);
    return result;
});
const getReviewTutor = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield review_model_1.default.find({ tutorId }).exec();
    return requests;
});
exports.reviewService = {
    createReview,
    getReviewTutor
};
