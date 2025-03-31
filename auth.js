import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import { connectToMongo } from "./utils/database";
import Admin from "./models/Admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers:[
       Credentials(
        {
            name:'Credentials',
            credentials:{
              email:{label:"Email", type: "text" },
              password: {label: "Password", type: "password" },
            },

            async authorize(credentials,req){
                const email=credentials?.email;
                const password=credentials?.password;

                console.log("Credentials at authjs",[email,password]);
                await connectToMongo();

                const admin=await Admin.findOne({email:email});
                console.log("Admin :",admin);
                if(!admin)
                    throw new Error("User not found in database");

                if(admin?.password!==password)
                   throw new Error("Password is incorrect");

                return admin;
            }
       }),
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user._id?.toString();
            }
            return token
        },
        async session({ session,user,token }) {
            if(token)
            {
                session.user.id = token.id
                session.user.role="admin";
            }
            return session
        }

    }
})