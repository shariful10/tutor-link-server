"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email address").min(1, "Email is required"),
    password: zod_1.z.string().min(6, "Password should have at least 6 characters"),
    role: zod_1.z.enum(['student', 'tutor']),
    userStatus: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    photo: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    salary: zod_1.z.string().optional(),
    tuition: zod_1.z.string().default("Available"),
    PreferredTeach: zod_1.z.string().optional(),
    tuitionStyle: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    experience: zod_1.z.string().optional(),
    subject: zod_1.z.string().optional(),
    availableDays: zod_1.z.string().optional(),
    class: zod_1.z.string().optional(),
    rating: zod_1.z.number().min(0).max(5).optional()
});
exports.UserValidation = {
    userValidationSchema
};
