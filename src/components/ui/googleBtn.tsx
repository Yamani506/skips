"use client"
import React from 'react'
import { Button } from './button'
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/app/utils/supabase/client";
import {useSearchParams } from "next/navigation";
import { useState } from'react';
export default function GoogleBtn() {

// const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const supabase=createClient();

  const handleGoogleLogin=async() => {
    // setIsGoogleLoading(true);
    try {
      const { data,error } = await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo: `http://localhost:3001/auth/callback${
           next? `?next=${encodeURIComponent(next)}` : ""}`

           
          // redirectTo: `${window.origin}/auth/callback${
         
          // }`
            // next ? `?next=${encodeURIComponent(next)}` : ""
          
          
        },
        
      });
      if (error) {
        throw error;
      }

      console.log('the data in googlebtn ',data);
    } catch  {
     
      // setIsGoogleLoading(false);
    }
  }
  return (
    <Button variant="outline" className="w-full flex gap-1" onClick={
        handleGoogleLogin
      } > 
        <FcGoogle />
        Login with Google
      </Button>
  )
}
