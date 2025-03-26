"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { InputField } from '@/components/ui/Input-Field';
import { useForm } from "react-hook-form";
import loginValidation from "@/core/validation/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginInsupabase } from "@/core/queries/auth";
import { useRouter } from "next/navigation";
import ContinueWith from "./forms/continueWith";
// import GoogleSignUp from "./googleBtn";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver:zodResolver(loginValidation)
  });
  
  // const useGoogle=useSignWithGoogle();
const route=useRouter();
  const uselogin=useLoginInsupabase(route);

  const onSubmitt = async (data:any) => {
    console.log(data);
    try{
      await uselogin.mutateAsync(data);
     console.log('succeefully saved');
    }catch(err){
      console.error('error:',err);
    }
    
  };

  return (
    <>
    <form className={cn("flex flex-col gap-6 ", className)} {...props} onSubmit={handleSubmit(onSubmitt)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6 ">
        <div className="grid gap-2">
          {/* <Label htmlFor="email">Email</Label> */}
          <InputField name="email" type="email" placeholder="m@example.com" id="email"  register={register} error={errors}/>
          
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            {/* <Label htmlFor="password">Password</Label> */}
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <InputField name="password" type="password"  register={register} id="password"  error={errors}/>
        </div>
        <Button type="submit" className="w-full border border-collapse hover:bg-gray-100">
          Login
        </Button>
      </div>
    </form>
       <ContinueWith linkName="SignUp" href="/signup"  />
    </>
  )
}