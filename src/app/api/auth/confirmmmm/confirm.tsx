// "use client";

// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase"; // Import your Supabase client
// import { cookies } from "next/headers"; // For storing session in cookies
// import { EmailOtpType } from "@supabase/supabase-js";

// export default function ConfirmEmail() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token_hash");
//   const type = searchParams.get("type"); // Type of auth action (signup, recovery, etc.)

//   useEffect(() => {
//     const confirmEmail = async () => {
//       if (!token || !type) {
//         console.error("❌ Missing token or type in URL");
//         return;
//       }

//       // ✅ Verify the OTP from URL (For email confirmation)
//       const { data, error } = await supabase.auth.verifyOtp({
//         type:type as EmailOtpType,
//         token_hash: token,
//       });

//       if (error) {
//         console.error("❌ Email confirmation error:", error.message);
//         return;
//       }

//       console.log("✅ Email confirmed! User:", data);

//       // ✅ Store session in cookies
//       document.cookie = `supabaseSession=${JSON.stringify(data.session)}; path=/; secure;`;

//       // ✅ Redirect user after confirmation
//       router.push("/dashboard");
//     };

//     confirmEmail();
//   }, [token, type, router]);

//   return <p>🔄 Confirming your email...</p>;
// }
