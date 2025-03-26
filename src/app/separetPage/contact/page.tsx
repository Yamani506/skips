"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Building2 } from "lucide-react"
import { useContactForm } from "@/core/queries/ContactForm"
import { InputField } from "@/components/ui/Input-Field"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {contactValidation} from "@/core/validation/contact"
import { createClient } from "@/app/utils/supabase/client"
export default function ContactPage() {


const contsct=useContactForm();
  const handelContact=async(data:any)=>{
   console.log(data);
  await  contsct.mutateAsync(data);
  }

const {register,handleSubmit,formState:{errors}} =useForm({
  resolver:zodResolver(contactValidation)
})
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex items-center h-screen justify-center">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handelContact)}>
            <div className="space-y-2">
              <InputField name="name" placeholder="Enter your name"  register={register} type="text" id={'name'} error={errors} />
            </div>

            <div className="space-y-2">
              <InputField name="email" type="email" placeholder="Enter your email" register={register} id={'email'} error={errors} />
            </div>

            <div className="space-y-2">
              <Textarea name="message" placeholder="Enter your message" className="min-h-[120px]" registre={register} error={errors} id={'message'} />
            </div>
            <Button type="submit" className="w-full md:w-auto border-collapse border ">
              Send Message
            </Button>
          </form>
        </div>

        <div className="flex items-center">
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Company Information</h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Company Name</p>
                      <p className="text-muted-foreground">SkipAi</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone Number</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Our team is available Monday through Friday, 9am to 5pm EST.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

