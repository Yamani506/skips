
// import { useQueryClient,useMutation } from "@tanstack/react-query";
// // import { signInWithGoogle } from "@/lib/supabaseAction";
// import { authLogin } from "./key";
// import { toast } from "sonner";
// export const useSignWithGoogle=()=>{
//     const client = useQueryClient();
//     return useMutation({
//       mutationFn:signInWithGoogle,
//       onSettled:()=>{
//         client.invalidateQueries({queryKey:[authLogin.google]});
//     },
//      onSuccess:()=>{
//       toast.success('Login successful');
//      },
//      onError:()=>{
//         toast.error('Login failed');
//  }
//     });}

