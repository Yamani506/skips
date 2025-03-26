
// import { type EmailOtpType } from "@supabase/supabase-js";
// import { type NextRequest } from "next/server";
// import { createClient } from "@/app/utils/supabase/server";
// import { redirect } from "next/navigation";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const token_hash = searchParams.get("token_hash");
//   const type = searchParams.get("type") as EmailOtpType | null;
//   const next = searchParams.get("next") ?? "/";

//   if (token_hash && type) {
//     const supabase = createClient();

//     const { error } =  (await  (await supabase).auth.verifyOtp({
//       type,
//       token_hash,
//     }));
//     if (!error) {
//       // redirect user to specified redirect URL or root of app
//       redirect(next);
//     }
//   }

//   // redirect the user to an error page with some instructions
//   redirect("/error");
// }










// here 



import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/app/utils/supabase/server'

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = '/dashboard'

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = await createClient()

    const { error,data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
    console.log('the data with confirm', data);
    console.log('the token hash', token_hash);
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}