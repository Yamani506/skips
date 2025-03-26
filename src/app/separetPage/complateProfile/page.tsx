"use client";
import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/Input-Field";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { complateProfileAfterSignWithGoggle, useSignUp } from "@/core/queries/auth";
import { useRouter } from "next/navigation";
// import GoogleBtn from '@/components/ui/googleBtn'

export default function ComplateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(complateProfile),
  });
  const router = useRouter();
  const useCoplateProfile =complateProfileAfterSignWithGoggle(router);
  const handelForm = async (data: any) => {
    console.log("in signup");
    try {
      await useCoplateProfile.mutateAsync(data);
      
      console.log("succeefully complate profile");
    } catch (err) {
      console.error("error:", err);
    }
    console.log('the data of complate profile', data);
    console.log("finish");
  };
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen">
    <form
      className={("flex flex-col w-1/4  gap-6")}
      onSubmit={handleSubmit(handelForm)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">complate The profile</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details to Complate your profile
        </p>
      </div>
      <div className="grid gap-6">
        <div className="flex w-full justify-between gap-3">
          <div className="grid  w-1/2">
            <InputField
              name="full_name"
              type="text"
              register={register}
              id={"full_name"}
              error={errors}
            />
          </div>
          <div className="grid w-1/2">
            <InputField
              name="organization_name"
              type="text"
              register={register}
              error={errors}
              id={"organization_mame"}
            />
          </div>
        </div>

        
        <div className="grid gap-1">
        <InputField
          name="phone_number"
          type="text"
          register={register}
          error={errors}
          id={"phone_number"}
        />

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
      <Button className="border ">
      Done
      </Button>
      </form>
      </div>
   
  );
}






// "use client";

// import { useEffect, useState } from "react";
// import { complateProfile } from "@/lib/supabaseAction";
// import { useRouter } from "next/navigation";

// export default function ComplateProfile() {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const userData:any = await complateProfile();
//       if (userData) {
//         setUser(userData);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (!user) {
//     return <p>❌ لم يتم العثور على جلسة، يرجى تسجيل الدخول</p>;
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen min-w-screen">
//       <div className="flex flex-col w-1/4 gap-6">
//         <h1 className="text-2xl font-bold">إكمال الملف الشخصي</h1>
//         <p className="text-sm text-muted-foreground">
//           أدخل بياناتك لإكمال الملف الشخصي
//         </p>
//         <p className="text-sm">مرحبا {user} 👋</p>
//         <button className="border p-2" onClick={() => router.push("/")}>
//           تم
//         </button>
//       </div>
//     </div>
//   );
// }
