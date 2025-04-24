"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.getPaymentEmail = exports.initiatePayment = void 0;
const crypto_1 = __importDefault(require("crypto"));
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const payment_model_1 = __importDefault(require("./payment.model"));
const payment_service_1 = require("./payment.service");
const initiatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tran_id = crypto_1.default.randomUUID();
    const { userEmail, tutorData } = req.body; // Destructure tutor data and user email
    //   console.log("Received Payment Data:", userEmail);
    // console.log("Received Payment Datdda:", tutorData);
    try {
        // Validate the received data
        if (!userEmail || !tutorData || !tutorData.tutorId || !tutorData.name || !tutorData.salary || !tutorData.subject) {
            res.status(400).json({ error: 'Incomplete payment data received.' });
        }
        // Prepare the payment data
        const data = {
            total_amount: tutorData.salary, // Assuming salary as the total price for payment
            currency: 'BDT',
            tran_id: tran_id,
            success_url: `https://tutors-x-new.vercel.app/success/${tran_id}`,
            fail_url: `http://localhost:5000/fail/${tran_id}`,
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: tutorData.name, // Tutor name as the product
            product_category: tutorData.subject, // Subject as the product category
            product_profile: 'general',
            cus_name: 'Customer Name', // Use customer name if available
            cus_email: userEmail, // User email
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111', // Use customer phone if available
            cus_fax: '01711111111', // Or remove if not needed
            ship_name: 'Customer Name', // Or use actual shipping name
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        // console.log(data ,"my data")
        const sslcz = new sslcommerz_lts_1.default("hr6799e6efb7586", "hr6799e6efb7586@ssl", false); // Use environment variables for these keys!
        const apiResponse = yield sslcz.init(data);
        if (!apiResponse || !apiResponse.GatewayPageURL) {
            res.status(400).json({ error: 'Failed to initialize payment', details: apiResponse });
        }
        // Save the order data to the database
        const finalOrder = {
            items: tutorData,
            paidStatus: false,
            transaction: tran_id,
            tutorId: tutorData.tutorId,
            tutorName: tutorData.name,
            totalAmount: tutorData.salary,
            userEmail: userEmail,
        };
        const createdOrder = yield payment_model_1.default.create(finalOrder);
        console.log('Order Saved:', createdOrder);
        // Return the payment URL for redirection
        res.json({ url: apiResponse.GatewayPageURL });
    }
    catch (error) {
        // console.error("Payment Error:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
exports.initiatePayment = initiatePayment;
const getPaymentEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail } = req.params;
        // console.log(userEmail)
        const requests = yield (0, payment_service_1.getRequestsPayment)(userEmail);
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
exports.getPaymentEmail = getPaymentEmail;
