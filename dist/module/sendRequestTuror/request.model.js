"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    tutorId: {
        type: String,
        required: [true, 'Please provide your id'],
    },
    userEmail: {
        type: String,
        required: [true, 'Please provide your email'],
    },
    status: {
        type: String,
        default: "panding"
    }
});
const RequestTutor = (0, mongoose_1.model)('request', requestSchema);
exports.default = RequestTutor;
