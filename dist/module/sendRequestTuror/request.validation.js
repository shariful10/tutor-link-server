"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSchema = void 0;
const zod_1 = require("zod");
exports.requestSchema = zod_1.z.object({
    tutorId: zod_1.z.string().nonempty("Tutor ID is required"),
    userEmail: zod_1.z.string().email("Invalid email format").nonempty("Email is required"),
    status: zod_1.z.string().default("panding").optional()
});
