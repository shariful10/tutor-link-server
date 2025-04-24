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
exports.requestController = void 0;
const request_model_1 = __importDefault(require("./request.model"));
const request_service_1 = require("./request.service");
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail } = req.body;
        const existingRequest = yield request_model_1.default.findOne({ userEmail });
        if (existingRequest) {
            throw new Error('user all ready request');
        }
        const result = yield request_service_1.requestService.sendRequestService(req.body);
        res.json({
            status: true,
            message: 'Request is created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.json({
            status: false,
            message: 'Something went wrong',
            err,
        });
    }
});
const getRequestsByTutorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.params.tutorId;
        const requests = yield request_service_1.requestService.getRequestsForTutor(tutorId);
        if (!requests || requests.length === 0) {
            res.json({
                status: false,
                message: 'No requests found for this tutor.',
            });
        }
        res.json({
            status: true,
            message: 'Requests fetched successfully',
            data: requests,
        });
    }
    catch (err) {
        res.json({
            status: false,
            message: 'Something went wrong',
            err,
        });
    }
});
const getRequestsDeleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.params.tutorId;
        const requests = yield request_service_1.requestService.deleteRequest(tutorId);
        res.json({
            status: true,
            message: 'Requests fetched successfully',
            data: requests,
        });
    }
    catch (err) {
        res.json({
            status: false,
            message: 'Something went wrong',
            err,
        });
    }
});
const getRequestsByStudentEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail } = req.params;
        const requests = yield request_service_1.requestService.getRequestsForStudent(userEmail);
        res.json({
            status: true,
            message: 'Requests fetched successfully',
            data: requests,
        });
    }
    catch (err) {
        res.json({
            status: false,
            message: 'Something went wrong',
            err,
        });
    }
});
exports.requestController = {
    createRequest,
    getRequestsByTutorId,
    getRequestsByStudentEmail,
    getRequestsDeleteById,
};
