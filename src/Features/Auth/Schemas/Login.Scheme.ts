import { z } from "zod";


export const LoginScheme = z.object({
    email:z.string().nonempty('email is requierd').pipe(z.email('inviled email')),
    password:z.string().nonempty('password is requird'),
    reMepaer:z.boolean()
})

type LoginFormValues = z.infer<typeof LoginScheme>;

export default LoginFormValues

