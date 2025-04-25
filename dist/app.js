"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const auth_route_1 = __importDefault(require("./module/auth/auth.route"));
const paymentRouter_1 = __importDefault(require("./module/payments/paymentRouter"));
const review_router_1 = __importDefault(require("./module/review/review.router"));
const request_router_1 = __importDefault(require("./module/sendRequestTuror/request.router"));
const user_router_1 = __importDefault(require("./module/user/user.router"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: 'https://tutor-link-client0.vercel.app', credentials: true }));
// router
app.use('/api/user', user_router_1.default);
app.use('/api/auth', auth_route_1.default);
app.use('/api/requests', request_router_1.default);
app.use('/api', paymentRouter_1.default);
app.use('/api', review_router_1.default);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Server Live ⚡',
    });
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err, req, res, _next) => {
    // console.log('error from app.ts', err)
    res
        .status(http_status_1.default.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message, error: err });
});
app.use('*', (req, res) => {
    res.status(404).json({
        status: false,
        message: 'Route not found',
    });
});
exports.default = app;
