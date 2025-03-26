"use client"
import { useQueryClient,useMutation } from "@tanstack/react-query";
import {conformForrm} from '@/lib/supabaseAction'
import { authLogin } from "./key";
import {toast} from 'react-toastify' ;

export const useContactForm=()=>{
    const client = useQueryClient();
    return useMutation({
      mutationFn:conformForrm,
      onSettled:()=>{
        client.invalidateQueries({
            queryKey:[authLogin.contactForm]
        })},
       onSuccess:()=>{
       toast.success('Contact successfully');
       },
       onError:()=>{
        toast.error('Contact failed');
       }
      
    })
}