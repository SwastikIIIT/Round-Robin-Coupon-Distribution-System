'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleAdminLogin } from "@/helper/handleAdminLogin"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const  LoginForm=()=>{
    
    const router=useRouter();
    
    const handleLogin=async(formData)=>{
         const toastID=toast.loading("Processing request...");
         try
         {
           const result=await handleAdminLogin(formData);
           console.log(result);
           if(result.success)
           {
              toast.success(result.message, {
                id: toastID,
                description:"Welcome back! You've been securely logged in.",
              });
            router.push("/coupon/admin-panel");
           }
           else
           {
            toast.error("Login failed", {id:toastID, description:result.message })
           }
         }
         catch(err)
         {
            console.log("Error in login:",err);
            if(err.message!=="NEXT_REDIRECT")
             toast.error("Failed to login",{id:toastID,description:err.message });
         }
         finally{
           setTimeout(() => {
             toast.dismiss(toastID);
           },3000);
          }
    }
    
  return (
    <div className="flex flex-col gap-6">

    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">

        <form action={handleLogin} className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">
                Login to your AlgoAuth account
              </p>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" placeholder="john@example.com" required />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input name="password" type="password" required />
            </div>

            <Button type="submit" className="cursor-pointer w-full">
              Login
            </Button>

              
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            
          </div>
        </form>

        <div className="bg-muted relative hidden md:block">
          <Image
            src="/login1.avif"
            alt="Login Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
        </div>
      </CardContent>
    </Card>

    <div
      className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
      and <a href="#">Privacy Policy</a>.
    </div>

  </div>
  );
}

export default LoginForm;
