import { z } from "zod";

export const requestSchema = z.object({
    tutorId: z.string().nonempty("Tutor ID is required"),
    userEmail: z.string().email("Invalid email format").nonempty("Email is required"),
    status: z.string().default("panding").optional()
});
