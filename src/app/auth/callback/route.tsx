// import { NextResponse } from "next/server";
// // The client you created from the Server-Side Auth instructions
// import { createClient } from "@/app/utils/supabase/server";
// import { redirect } from "next/navigation";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   // if "next" is in param, use it as the redirect URL
//   const next = searchParams.get("next") ?? "/";

//   if (code) {
//     const supabase = createClient();
//     const { error,data } = await supabase.auth.exchangeCodeForSession(code);
//     if(data){
//       redirect('/separetPage/complateProfile')
//     }

//     if (!error) {
//       const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
//       const isLocalEnv = process.env.NODE_ENV === "development";
//       if (isLocalEnv) {
//         // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
//         return NextResponse.redirect(`${origin}${next}`);
//       } else if (forwardedHost) {
//         return NextResponse.redirect(`https://${forwardedHost}${next}`);
//       } else {
//         return NextResponse.redirect(`${origin}${next}`);
//       }
//     }
//   }

//   // return the user to an error page with instructions
//   return NextResponse.redirect(`${origin}/auth/auth-code-error`);
// }



// second Code 

// import { NextResponse } from "next/server";
// // The client you created from the Server-Side Auth instructions
// import { createClient } from "@/app/utils/supabase/server";
// import { takesSession } from "@/lib/supabaseAction";
// import { cookies } from "next/headers";
// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   // if "next" is in param, use it as the redirect URL
//   const next = searchParams.get("next") ?? "/";

//   if (code) {
//     const supabase = await createClient();
//     const { error,data} = await supabase.auth.exchangeCodeForSession(code);
//     console.log('The  code was exchange to get data from the server',data.user?.email)
   
//     if (data && data.user) {
//       // إنشاء response جديد مع الكوكيز لتخزين التوكن
     
//       // takesSession(data.session);
//       // localStorage.setItem('storage_session',JSON.stringify(data.session));

//       const cookieStore = await cookies();
//       cookieStore.set("supabaseSession", JSON.stringify(data.session), {
//         httpOnly: true, // 🔹 يجعلها غير قابلة للقراءة من JavaScript
//         secure: process.env.NODE_ENV === "production", // 🔹 يتم التفعيل فقط في بيئة الإنتاج
//         sameSite: "strict", // 🔹 يمنع CSRF
//         path:'separetPage/complateProfile' // 🔹 يجعل الجلسة متاحة في جميع أنحاء الموقع
//       });
//       const response = NextResponse.redirect(`${origin}/separetPage/complateProfile`);
// //  console.log('the data by cookies is :',cookieStore.get('supabaseSession'));
//       return response;
//     }
//     if (!error) {
//       const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
//       const isLocalEnv = process.env.NODE_ENV === "development";
//       if (isLocalEnv) {
//         // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
//         return NextResponse.redirect(`${origin}${next}`);
//       } else if (forwardedHost) {
//         return NextResponse.redirect(`https://${forwardedHost}${next}`);
//       } else {
//         return NextResponse.redirect(`${origin}${next}`);
//       }
//     }
    
//   }

//   // return the user to an error page with instructions
//   return NextResponse.redirect(`${origin}/auth/auth-code-error`);
// }

// end code 






import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("❌ خطأ أثناء تبادل الكود:", error.message);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  if (data && data.session) {
    console.log(data.session);
    const cookieStore =await  cookies();
    // localStorage.setItem('cookieStore', JSON.stringify(data.session));
    cookieStore.set("supabaseSession", JSON.stringify(data.user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 🔹 يتم التفعيل فقط في بيئة الإنتاج
      sameSite: "strict", //  يمنع CSRF
      path: "/", // يجعل الجلسة متاحة في جميع أنحاء الموقع
    });


    console.log('the session that store in cookies :',cookieStore.get('supabaseSession'),'i gety it ');

    // توجيه لصفحه البروفايل 
    return NextResponse.redirect(`${origin}/separetPage/complateProfile`);
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
