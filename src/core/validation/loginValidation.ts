import * as z from 'zod'
const loginValidation=z.object({
    email:z.string(
        {
            required_error:'Email is requried',
            
        }
    ).email().nonempty('Email is required'),
    password: z.string().min(8,'Password will be bigger than 8').max(100).nonempty("password will be required")
})
export default loginValidation;
