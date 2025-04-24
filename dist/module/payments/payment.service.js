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
exports.getRequestsPayment = void 0;
const payment_model_1 = __importDefault(require("./payment.model"));
const getRequestsPayment = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield payment_model_1.default.find({ userEmail }).exec();
        // console.log(requests, "email");
        return requests;
    }
    catch (error) {
        console.error("Error fetching requests:", error);
        throw new Error("Failed to fetch requests for the student.");
    }
});
exports.getRequestsPayment = getRequestsPayment;
