import { z } from 'zod';

const userValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password should have at least 6 characters"),
    role: z.enum(['student', 'tutor']),
    userStatus: z.string().optional(),
    bio: z.string().optional(),
    photo: z.string().optional(),
    phone: z.string().optional(),
    salary: z.string().optional(),
    tuition: z.string().default("Available"),
    PreferredTeach: z.string().optional(),
    tuitionStyle: z.string().optional(),
    location: z.string().optional(),
    experience: z.string().optional(),
    subject: z.string().optional(),
    availableDays: z.string().optional(),
    class: z.string().optional(),
    rating: z.number().min(0).max(5).optional()
});


export const UserValidation = {
    userValidationSchema
}



