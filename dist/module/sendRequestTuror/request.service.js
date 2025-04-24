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
exports.requestService = void 0;
const request_model_1 = __importDefault(require("./request.model"));
const sendRequestService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ tutorId, userEmail }) {
    try {
        if (!tutorId || !userEmail) {
            throw new Error('Invalid data provided');
        }
        const result = yield request_model_1.default.create({ tutorId, userEmail });
        return result;
    }
    catch (err) {
        throw new Error(err.message || 'Failed to send request!');
    }
});
const getRequestsForTutor = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield request_model_1.default.find({ tutorId }).exec();
    return requests;
});
const deleteRequest = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield request_model_1.default.findOneAndDelete({ tutorId });
    return requests;
});
const getRequestsForStudent = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield request_model_1.default.find({ userEmail }).exec();
        return requests;
    }
    catch (err) {
        throw new Error(err.message || 'Failed to get requests!');
    }
});
exports.requestService = {
    sendRequestService,
    getRequestsForTutor,
    getRequestsForStudent,
    deleteRequest,
};
