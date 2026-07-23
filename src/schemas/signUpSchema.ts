import { z } from "zod";


export const userNameValidation = z
    .string()
    .min(2, { error: "Username at least 2 characters." })
    .max(25, { error: "Username cannot be more than 25 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, { error: "Username cannot contain special characters." });


export const signUpSchema = z.object({
    userName: userNameValidation,
    email: z.email({ error: "Invalid Email address." }),
    password: z
        .string()
        .min(6, { error: "Password at least 6 characters." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must be at least 6 characters long, include uppercase, lowercase, number, and special character.")
});