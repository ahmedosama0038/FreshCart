import {z }from 'zod'


export  const SchemaAddress= z.object({
   name: z
  .string()
  .nonempty("Name is required")
  .min(3, "Name must be at least 3 characters")
  .max(50, "Name must not exceed 50 characters"),
   details: z
    .string()
    .nonempty(' detail is required')
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long"),

  city: z
    .string()
    .nonempty('city is required')
    .trim()
    .min(3, "City name must be at least 3 characters")
    .max(50, "City name is too long"),

  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^01[0-9]{9}$/,
      "Please enter a valid Egyptian phone number (01xxxxxxxxx)"
    ),

})

export  type SchemaAddressValues= z.infer<typeof SchemaAddress>



export  const SettingsSchema=z.object({
    name: z
  .string()
  .nonempty("Name is required")
  .min(3, "Name must be at least 3 characters")
  .max(50, "Name must not exceed 50 characters"),
   phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^01[0-9]{9}$/,
      "Please enter a valid Egyptian phone number (01xxxxxxxxx)"
    ),
email: z.string().nonempty("emil is required").pipe(z.email("Invalid email address")) ,

})

export type SchemaSettingsValues= z.infer<typeof SettingsSchema>




export const changePasswordSchema = z.object({
   
    currentPassword: z.string().min(1, "Current password is required"),

   
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),

  
    rePassword: z.string().min(1, "Please confirm your new password"),
  })
 
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"], 
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;