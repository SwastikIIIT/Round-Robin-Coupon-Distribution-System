'use server';
import { signOut } from "@/auth";

export const handleSignout=async()=>{
    
    try{
        await signOut();
       
    }
    catch(Err)
    {
        console.log(Err);
    }
}