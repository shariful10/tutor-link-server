"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email must be provided and must be a string",
    }).email(),
    password: zod_1.z.string({ required_error: 'Password is required' }),
});
exports.AuthValidation = {
    loginValidationSchema,
};
