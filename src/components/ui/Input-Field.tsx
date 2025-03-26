'use client'
import * as React from "react"
// import { cn } from "@/app/lib/utils"
import { UseFormRegister } from "react-hook-form"
import { cn } from '@/lib/utils';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?:any,
  register:UseFormRegister<any>,
  name: string,
  label?:string,
  id:any
}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(({ className, type,register,error,name,id,label,...props},_ref) => {
  return (

    <div className="mb-2">
      <label className="block text-sm font-medium text-white pb-1">
      {name}
      </label>
    <input
    
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
     
       {...register(name)}
      {...props}
    />
    {
     error[id] &&(
        <p className="text-xs text-red-600 pt-1">{error[id]?.message}</p>
      )
    }
    </div>
  )
})
InputField.displayName = "Input"

export { InputField }


