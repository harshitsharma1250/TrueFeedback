import {z} from 'zod' ;

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 3 characters long")
  .max(20, "Username must not exceed 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain alphanumeric characters, underscores, and hyphens")


export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email("Please enter a valid email address"),
    password : z.string().min(6, "Password must be at least 6 characters long")
})
