"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";
export default  function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); // ✅ استخراج كود المصادقة
 const supabase=  createClient();
  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (!code) {
        console.error("❌ لم يتم استلام كود OAuth");
        router.push("/signin"); // 🔄 إعادة المستخدم إلى صفحة تسجيل الدخول
        return;
      }

      console.log("🔄 تبادل الكود لجلسة:", code); // Log the code being exchanged

      // Check if the code is valid before proceeding
      if (!code) {
        console.error("❌ كود OAuth غير صالح");
        router.push("/signin");
        return;
      }

      // ✅ تبادل الكود للحصول على جلسة تسجيل الدخول
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      console.log('the Data is :', data.user?.email); // Log the response data
// console.log('the Data is :',data);
      if (error) {
        console.error("❌ خطأ في التحقق:", error.message); // Log the error message
        router.push("/signin"); // ❌ إعادة المستخدم إلى تسجيل الدخول في حالة الفشل
        return;
      }

      console.log("✅ المستخدم مسجل الدخول:", data);

      // ✅ إعادة التوجيه بعد نجاح تسجيل الدخول
      router.push("/dashboard"); // 🟢 توجيه المستخدم إلى صفحة الـ Dashboard
    };

    handleAuthRedirect();
  }, [code, router]);

  return <p>🔄 يتم معالجة تسجيل الدخول...</p>;
}
