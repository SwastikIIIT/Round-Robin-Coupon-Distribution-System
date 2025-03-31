'use server';
import {signIn } from "@/auth";

export const handleAdminLogin=async(formData)=>{

    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Form data:", [email, password]);

        if(!email || !password)
        {
           return {success: false,message: "Please provide all fields"}
        }
        try
        { 
            console.log("Execution in try block");
            await signIn("credentials",{
               email: email,
               password: password,
               redirect:false
            })
            console.log("Execution of signin block");
          return {success:true,message:"Logged in successfully"};
       }
       catch(err)
       {
          console.log("Login error:", err)
          return {success:false,message:err.cause.err.message};
       }   
}