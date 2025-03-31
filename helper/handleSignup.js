'use server';

import Admin from "@/models/Admin";
import { connectToMongo } from "@/utils/database";


export const handleSignup=async(formData)=>{

      const username=formData.get("username");
      const email=formData.get("email");
      const password=formData.get("password");


      console.log("Form data:", [username,email,password]);
     
      if(!username || !email)
        throw Error("Missing credentials");

     //connect with database
       await connectToMongo();
      
     const user=await Admin.findOne({email:email});
     console.log("Admin found:", user);

      if(user)
        return {ok:"failure",message:"Admin already exists"};
     
      else
      {
        await Admin.create({
          name:username,
          email:email,
          password:password,
          role:"admin"
        });
        return {ok:"success",message:"Account created successfully :)"};
      }
  }
