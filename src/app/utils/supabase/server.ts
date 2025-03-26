
import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore =await cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies:{
        getAll() {
        return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}



// // import { createServerClient } from '@supabase/ssr'
// // import { cookies } from "next/headers";
// // "
// // export function createClient() {
// // //   const cookieStore = cookies();
// // // const headres=new Headers() ;
// // //   return createServerClient(
// // //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
// // //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// // //     {
// // //       cookies: {
// // //         getAll:()=> parseCookieHeader(request.headres.get('Cookie') ?? ''),
// // //           // cookieStore.getAll(),
        
        

// // //         setAll: (cookiesToSet) => {
// // //           if (typeof window === "undefined") {
// // //             // Prevent modifying cookies in a Server Component
// // //             return;
// // //           }
// // //           cookiesToSet.forEach(({ name, value, options }) =>
// // //             cookieStore.set(name, value, options)
// // //           );
// // //         },
// // //       },
// // //     }
// // //   );
// // // }

// // const headers = new Headers();
  
// // const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
// //   cookies: {
// //     getAll() {
// //       return parseCookieHeader(request.headers.get('Cookie') ?? '')
// //     },
// //     setAll(cookiesToSet) {
// //       cookiesToSet.forEach(({ name, value, options }) =>
// //         headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
// //       )
// //     },
// //   },
// // });

// // }





// // import {createServerClient} from "@supabase/auth-helpers-nextjs";
// // import { cookies } from "next/headers";

// // /**
// //  * دالة لتحليل (Parse) كود الكوكيز من الهيدر
// //  */
// // function parseCookieHeader(cookieHeader: string) {
// //   return cookieHeader
// //     .split("; ")
// //     .map((cookie) => cookie.split("="))
// //     .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
// // }

// // /**
// //  * دالة لإنشاء كود الكوكيز (Serialize)
// //  */
// // function serializeCookieHeader(name: string, value: string, options: any) {
// //   let cookieString = `${name}=${value}; Path=/;`;
// //   if (options?.httpOnly) cookieString += " HttpOnly;";
// //   if (options?.secure) cookieString += " Secure;";
// //   if (options?.sameSite) cookieString += ` SameSite=${options.sameSite};`;
// //   return cookieString;
// // }

// // /**
// //  * إنشاء عميل Supabase للخادم مع تمرير `request` للحصول على الكوكيز
// //  */
// // export function createClient(request: Request) {
// //   const cookieStore = cookies();
// //   const cookieHeader = request.headers.get("Cookie") ?? ""; // ✅ استخراج الكوكيز

// //   return createServerClient(
// //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// //     {
// //       cookies: {
// //         getAll: () => parseCookieHeader(cookieHeader), // ✅ تحليل الكوكيز من الهيدر
// //         setAll: (cookiesToSet) => {
// //           cookiesToSet.forEach(({ name, value, options }) =>
// //             cookieStore.set(name, value, options)
// //           );
// //         },
// //       },
// //     }
// //   );
// // }
