import * as z from 'zod'

export const contactValidation =z.object({
    name: z.string({
        required_error:'Name is required',
    }).nonempty('Name is required'),
    email: z.string(
        {
            required_error:'Email is requried',
            
        }
    ).email().nonempty('Email is required'),
    message: z.string().min(10,'Message will be bigger than 10').max(500).nonempty("Message will be required")
})