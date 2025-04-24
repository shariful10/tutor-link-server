"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const paymentRouter = express_1.default.Router();
paymentRouter.get('/payment/:userEmail', payment_controller_1.getPaymentEmail);
paymentRouter.post('/payment', (0, catchAsync_1.default)(payment_controller_1.initiatePayment));
exports.default = paymentRouter;
