"use client";
import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/Input-Field";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siginupValidation } from "@/core/validation/signupValidation";
// import { NewRegistred } from "@/lib/supabaseAction";
import Link from "next/link";
import { useSignUp } from "@/core/queries/auth";
import { useRouter } from "next/navigation";
import GoogleBtn from '@/components/ui/googleBtn'
import ContinueWith from "./forms/continueWith";
import PhoneInput from "./forms/phone-input";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(siginupValidation),
  });
  const router = useRouter();

  const usesignup = useSignUp(router);
  const handelForm = async (data: any) => {
    console.log("in signup");
    try {
      await usesignup.mutateAsync(data);
      console.log("succeefully saved");
    } catch (err) {
      console.error("error:", err);
    }
    console.log(data);
    console.log("finish");
  };
  return (
    <>
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(handelForm)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create new an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="flex w-full justify-between gap-3">
          <div className="grid  w-1/2">
            <InputField
              name="full_Name"
              type="text"
              register={register}
              id={"full_Name"}
              error={errors}
            />
          </div>
          <div className="grid w-1/2">
            <InputField
              name="organization_Name"
              type="text"
              register={register}
              error={errors}
              id={"organization_Name"}
            />
          </div>
        </div>

        <InputField
          name="email"
          type="text"
          register={register}
          error={errors}
          id={"email"}
        />
        {/* <div className="grid gap-1 "> */}

        <div className="flex justify-between min-w-full gap-x-2 items-center">
 <div className="grid w-1/2">

 <PhoneInput registre={register} error={errors} id={"phone_Number"} name={"phone_Number"}/>
 {/* <InputField
          name="phone_Number"
          type="text"
          register={register}
          error={errors}
          id={"phone_Number"}
        /> */}
      
 </div>

 <div className="grid w-1/2">
 <InputField
            name="organization_contact_email"
            type="email"
            placeholder="example@company.com"
            error={errors}
            id={"organization_contact_email"}
            register={register}
          />

 
 </div>

        </div>
        

          
          <InputField
            name="password"
            type="password"
            register={register}
            error={errors}
            id={"password"}
          />
        {/* </div> */}
        {/* <div className="grid gap-1"> */}
          {/* <Label htmlFor="password">Password</Label> */}
         
        {/* </div> */}
        <Button type="submit" disabled={usesignup.isPending} className="w-full border-collapse border hover:bg-gray-300">
          {!usesignup.isPending ? "create new account" : "waiting"}
        </Button>
        {/* relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-1 after:flex after:items-center after:border-t after:border-border */}
        {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-[-1] after:flex after:items-center after:border-t after:border-border pb-1">
          <span className="relative z-100 bg-black px-1 text-muted-foreground">
            Or continue with
          </span>
        </div> */}
      </div>
      </form>
       {/* <GoogleBtn/> */}

       <ContinueWith linkName="Login" href="/signin"  />

      {/* <div className="text-center text-sm pt-1">
        Already have an account?{" "}
        <Link href="/signin" className="underline underline-offset-4 ">
          Sign in
        </Link>
      </div> */}

      </>
   
  );
}
