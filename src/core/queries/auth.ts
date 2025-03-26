// import {useMutation, useQueryClient} from 'react-query'
import {Login} from '@/lib/supabaseAction'
import  {useMutation, useQueryClient}from '@tanstack/react-query'
import {authLogin} from '@/core/queries/key';
 import {NewRegistered} from '@/lib/supabaseAction'
 import  {complateProfile} from '@/lib/supabaseWithSignInGoogle'
import {toast} from 'react-toastify'

// uselogin in supabase action

export const useLoginInsupabase=(route:any)=>{
    const client =useQueryClient();
    return useMutation({
     mutationFn:async(data:any)=>Login(data),
     onSettled:()=>{
        client.invalidateQueries({queryKey:[authLogin.authLoginForm]});
    },
     onSuccess:()=>{
      toast.success('Login successful');
      route.push('/dashboard');
     },
     onError:()=>{
       
     }
    })};


    // 
    export const useSignUp=(route:any)=>{
        const client =useQueryClient();
        return useMutation({
            mutationFn:async (data:any)=>await NewRegistered(data),
            onSettled:()=>{
            client.invalidateQueries({queryKey:[authLogin.authLoginForm]});
            },
            onSuccess:()=>{
                toast.success('create new account');
                route.push('/separetPage/confirmUi');
            },
            onError:()=>{
                toast.error('SignUp failed');
            }
        })
    }



    // use contactForm


    // const clientQueries=useQueryClient();
    // return useMutation({
    //     mutationFn:async(data)=>Login,
    //     onSettled() {
    //         // clientQueries.clear();
    //         // clientQueries.invalidateQueries([authLogin]);

    //     },
    //     onSuccess(){
    //         toast.success('Login successful');
    //     },
    //     onError(error){
    //         toast.error('Login failed');
    //     }
    // })




export const complateProfileAfterSignWithGoggle=(route:any)=>{
    const client =useQueryClient();
    return useMutation({
        mutationFn:async (data:any)=>complateProfile(data),
        onSettled:()=>{
            client.invalidateQueries({queryKey:[authLogin.google]});
        },
        onSuccess:()=>{
            toast.success('Profile complate');
             route.push('/separetPage/confirmUi');
        },
        onError:()=>{
            toast.error('Profile complate failed');
        }

    })
}