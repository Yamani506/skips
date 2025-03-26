import * as z from 'zod'
export const complateProfile=z.object({
    full_Name:z.string({
        required_error:'Full Name is required',
    }).nonempty('Full Name is required'),
    organization_Name: z.string({
        required_error:'Company Name is required',
    }).nonempty('Company Name is required'),
    phone_Number: z.string({
        required_error:'Company Number is required',
    }).nonempty('Company Number is required'),
    organization_contact_email: z.string({
        required_error:'Email is required',
    }).email('Email is required').nonempty('Email is required'),
   
    
})