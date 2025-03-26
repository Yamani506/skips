"use server"
import { cookies } from "next/headers";
import { supabase } from "./supabase";




export const complateProfile = async ({
    full_name,
    organization_name,
    organization_contact_email,
    phone_number,
  }: {
    full_name: string;
    organization_name: string;
    organization_contact_email: string;
    phone_number: string;
  }) => {
    const cookieStore =await cookies();
    const sessionCookie:any = cookieStore.get("supabaseSession")?.value;
    const iduser=JSON.parse(sessionCookie);
  console.log('the data with session cookie',sessionCookie);
    if (!sessionCookie) {
      console.log("there is not a session cookie");
      return null;
    }
    console
  
    try {
      // ✅ استرجاع الجلسة المخزنة
      // const session = JSON.parse(sessionCookie);
      // console.log("✅ الجلسة المسترجعة من `cookies`:", session);
      const { error,data } = await supabase
        .from("profiles")
        .update({
      
          full_name: full_name,
          organization_name: organization_name,
          organization_contact_email: organization_contact_email,
          phone_number: phone_number,
          
        })
        .eq("id",iduser).select('*'); // ✅ استخدم `session.user.id` بدلاً من `getSession()`
  
      if (error) {
        console.error("the error happen here for session cookies in fun ", error.message);
        return null;
      }
      console.log("the phone_Number",phone_number);
  console.log("the data after update is :",data);
      console.log("✅ done the update operation ");
      // return session.user; // ✅ أعد البيانات حتى يمكن استخدامها في الواجهة
    } catch (error) {
      console.error("❌ خطأ أثناء تحليل `cookies`:", error);
      return null;
    }
  };