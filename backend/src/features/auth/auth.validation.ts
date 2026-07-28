import {z} from "zod";

export const signupSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  }),
});


export type SignupInput = z.infer<typeof signupSchema>['body'];


export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>["body"];

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
  })
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>['body'];


export const resetPasswordSchema = z.object({
  body: z.object({
    newPassword : z.string().min(8, "Minimum 8 characters are required"),
  }),

  params: z.object({
    token: z.string()
  })
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>['body'];

export type ResetPasswordParams = z.infer<typeof resetPasswordSchema>['params'];