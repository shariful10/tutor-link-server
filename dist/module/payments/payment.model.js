"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Order Schema (Updated)
const OrderSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
    },
    tutorId: {
        type: String,
    },
    tutorName: {
        type: String,
    },
    salary: {
        type: Number,
    },
    subject: {
        type: String,
    },
    totalAmount: {
        type: String,
    },
    transaction: {
        type: String,
    },
    paidStatus: {
        type: String,
        default: "paid",
    },
}, {
    timestamps: true,
});
const Payment = (0, mongoose_1.model)('order', OrderSchema);
exports.default = Payment;
