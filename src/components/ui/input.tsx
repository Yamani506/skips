import * as React from 'react';

import { cn } from '@/lib/utils';
import { UseFormRegister } from "react-hook-form"
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    register:UseFormRegister<any>,
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,register ,...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...register}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };




// import * as React from "react";
// import { cn } from "@/app/lib/utils";
// import { UseFormRegister } from "react-hook-form"; // ✅ Import correct type

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   name: string;
//   error?: string;
//   register: UseFormRegister<any>;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, label, name, register, error, ...props }, _ref) => { // ❌ Do NOT use ref directly
//     return (
//       <div className="mb-4">
//         {/* ✅ Display label if provided */}
//         {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}

//         <input
//           id={name}
//           type={type}
//           {...register(name)} // ✅ This includes ref, so no need to manually assign it
//           className={cn(
//             "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//             className
//           )}
//           {...props} // ✅ Spread remaining props
//         />

//         {/* ✅ Display error message only if error exists */}
//         {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
//       </div>
//     );
//   }
// );

// Input.displayName = "Input";

// export { Input };








// import React from "react";
// /* eslint-disable react/prop-types */
// const FieldInput = ({
//     id,
//     label,
//     type = "text",
//     register,
//     errors,
//     placeholder,
//   }:any) => (
//     <div className="mb-4">
//       <label
//         htmlFor={id}
//         className="block text-sm font-medium text-gray-700 mb-4 text-left"
//       >
//         {label}
//       </label>
//       <input
//         id={id}
//         name={id}
//         type={type}
        
       
//       {...register(id)}
//         className="w-full bg-gray-100 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-left"
//         placeholder={placeholder}
//       />
//       {errors[id] && (
//         <p className="mt-2 text-sm text-red-600">{errors[id]?.message}</p>
//       )}
//     </div>
//   );
  
//   export default FieldInput;