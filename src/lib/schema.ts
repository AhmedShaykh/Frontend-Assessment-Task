import z from "zod";

export const loginSchema = z.object({
    email:
        z.string()
            .email("Invalid email address").min(1, "Email is required"),
    password:
        z.string()
            .min(6, "Password must be at least 6 characters")
});

export const registerSchema = z.object({
    fullName:
        z.string()
            .min(1, "Full name is required"),
    email:
        z.string()
            .email("Invalid email address"),
    phone:
        z.string()
            .min(7, "Phone must be at least 7 characters"),
    password:
        z.string()
            .min(6, "Password must be at least 6 characters"),
});