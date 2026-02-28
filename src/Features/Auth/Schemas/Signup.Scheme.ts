import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string().nonempty("nama is required").min(2, "Name must be at least 2 characters long"),

    email: z.string().nonempty("emil is required").pipe(z.email("Invalid email address")) ,

    password: z
      .string().nonempty("password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character",
      ),

    rePassword: z.string().nonempty("rePassword is required"),

    Terms: z.boolean().refine((val) => val === true, {
      error: "You must accept the terms and conditions",
    }),

    phone: z
      .string().nonempty("phone is required")
      .regex(
        /^01[0125][0-9]{8}$/,
        "Please enter a valid Egyptian phone number",
      ),
    })
    .refine((data) => data.password === data.rePassword, {
      error: "Passwords do not match",
      path: ["rePassword"],
})

type SignupFormValues = z.infer<typeof SignupSchema>;

export default SignupFormValues;
