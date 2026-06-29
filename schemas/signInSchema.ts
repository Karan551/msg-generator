
import { z } from "zod";

export const signInSchema = z.object({
    email: z.email({ error: "Invalid Email address." }),
    password: z
        .string()
        .min(6, { error: "Password at least 6 characters." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must be at least 6 characters long, include uppercase, lowercase, number, and special character.")
});