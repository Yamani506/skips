
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

import { parse } from "path";
import { json } from "stream/consumers";
// import { revalidatePath } from 'next/cache';

// login in supabase with email and password
export const Login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    toast.error("Password or Email is incorrect");
    console.log("Login error ");
  }

  // redirect("/dashboard");

  return data;
};
//end function

// . newRegistred in supabase with email

export const NewRegistered = async ({
  password,
  full_Name,
  organization_Name,
  phone_Number,
  email,
  organization_contact_email,
}: any) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        //  emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`, // ✅ Ensure this is set correctly
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
        // redirectTo:
        data: {
          full_name: full_Name, // ✅ Ensure Supabase matches expected field names
          organization_name: organization_Name,
          organization_contact_email: organization_contact_email,
          phone_number: phone_Number,
        },
      },
    });
    console.log('im here in fun')
    if(data){
      console.log('the data is recived', data);
    }
    // console.log(email, password);
    if (error) {
      console.error("❌ Sign-Up Error:", error.message);
      throw new Error(error.message); // ✅ Throw a proper error message
    }
    console.log("✅ User registered:", data);
    // revalidatePath('/', 'layout')
    // redirect('/separetPage/confirmUi');
    // route.push('/separetPage/confirmUi');

    return data;
  } catch (error) {
    console.log("catch error:", error);
  }
};

// export  const NewRegistred=async({email,password,full_name,organization_name,phone_number,organization_contact_emaul}:any)=>{
//   const {data,error}=await supabase.auth.signUp({
//     email:email,password:password,
//   options:{
//          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
//          data:{full_name:full_name,organization_name:organization_name,organization_contact_emaul:organization_contact_emaul,phone_number:phone_number},
//   }
//   });
//   if(error)throw error;
//   console.log(data);
// }

// end function

// used to contactForm

export const conformForrm = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from("visitors")
    .insert({ full_name: name, email: email, message: message })
    .select();
  if (error) throw error; //if error happened
  console.log(data); // the data was came
};

// Function used with google
// export const signInWithGoogle = async () => {
//   // const Next_auth_callback=`${process.env.NEXTAUTH_URL}/auth/callback`;
//   const searchParams = useSearchParams();
//   const next = searchParams.get("next");
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: `${window.location.origin}/auth/callback${
//         next ? `?next=${encodeURIComponent(next)}` : ""
//       }`,
//     },
//   });
//   if (error) throw new Error(error.message);
//   console.log(data);
//   if (data) {
//     redirect(data?.url);
//   }
// };









// function used for complate The Profile After login with google

// export const complateProfile = async ({
//   full_name,
//   organization_name,
//   organization_contact_email,
//   phone_number,
// }: {
//   full_name: string;
//   organization_name: string;
//   organization_contact_email: string;
//   phone_number: string;
// }) => {
//   const cookieStore = await cookies();
//   const session = cookieStore.get("supabaseSession");
//   console.log('the data with session is :',session);
//   const { data: user, error: userError } = await supabase.auth.getSession();
//   const { error } = await supabase
//   .from("profiles")
//   .update({
//     full_name: full_name,
//     organization_name: organization_name,
//     organization_contact_email: organization_contact_email,
//     phone_number: phone_number,
//   })
//   .eq('id',user.session?.user.id);

// if (error) {
//   console.log("حصل خطا اثنا تحديث البيانات ");
//   return;
// }
// // if(data)console.log('the data that coming from session',data);
//   console.log("تم تحديث البيانات بنجاح");

// }







//function used to save the used in supabase

export const saveProfileUser = async (user: any) => {
  const { id, email } = user;
  const { data, error } = await supabase.from("profiles").upsert({
    id,
    email,
    full_name: user.user_metadata.full_name || "",
    organization_name: user.user_metadata.organization_name || "",
    organization_contact_email:
      user.user_metadata.organization_contact_email || "",
    phone_number: user.user_metadata.phone_number || "",
  });
  if (error) console.log("حدث خطا ما في بيانات المستخدمين");
  console.log("تم حفظ البيانات بنجاح", data);
};





export async function takesSession(session:any){
  const {data,error}=await supabase.auth.setSession(session);
  if(error)console.log('can not set session');
  console.log('session set successfully',data);
  // localStorage.setItem("supabaseSession", JSON.stringify(data));
  return data;

}





// export const complateProfile = async ({
//   full_name,
//   organization_name,
//   organization_contact_email,
//   phone_number,
// }: {
//   full_name: string;
//   organization_name: string;
//   organization_contact_email: string;
//   phone_number: string;
// }) => {
//   const cookieStore =await cookies();
//   const sessionCookie:any = cookieStore.get("supabaseSession")?.value;
//   const iduser=JSON.parse(sessionCookie);
// console.log('the data with session cookie',sessionCookie);
//   if (!sessionCookie) {
//     console.log("there is not a session cookie");
//     return null;
//   }
//   console

//   try {
//     // ✅ استرجاع الجلسة المخزنة
//     // const session = JSON.parse(sessionCookie);
//     // console.log("✅ الجلسة المسترجعة من `cookies`:", session);
//     const { error,data } = await supabase
//       .from("profiles")
//       .update({
    
//         full_name: full_name,
//         organization_name: organization_name,
//         organization_contact_email: organization_contact_email,
//         phone_number: phone_number,
        
//       })
//       .eq("id",iduser).select('*'); // ✅ استخدم `session.user.id` بدلاً من `getSession()`

//     if (error) {
//       console.error("the error happen here for session cookies in fun ", error.message);
//       return null;
//     }
//     console.log("the phone_Number",phone_number);
// console.log("the data after update is :",data);
//     console.log("✅ done the update operation ");
//     // return session.user; // ✅ أعد البيانات حتى يمكن استخدامها في الواجهة
//   } catch (error) {
//     console.error("❌ خطأ أثناء تحليل `cookies`:", error);
//     return null;
//   }
// };
