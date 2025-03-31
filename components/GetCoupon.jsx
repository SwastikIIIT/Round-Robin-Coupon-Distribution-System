'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ClipboardCopy, Clock, Gift, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const GetCoupon=()=>{
    const [error,setError]=useState('');
    const [coupon,setCoupon]=useState(null);
    
    const [cooldown,setCoolDown]=useState(false);
    const [countdown,setCountDown]=useState(0);

   useEffect(()=>{
      let timer;
      if(cooldown && countdown>0)
      {
         timer=setInterval(()=>{
            setCountDown((prev)=>{
               if(prev==0)
               {
                   setCoolDown(false);
                   return 0;
               }
               return prev-1;
            })
         },1000)
      }

     return ()=>clearInterval(timer);
   },[cooldown,countdown])

    const claimCoupon=async()=>{
        try
        {
            const data=await fetch("/api/claim-coupon",{
                method:'POST',
                headers:{"Content-type":"application/json"}
            })

            const response=await data.json();
            console.log("Response",response);

            if(data.ok && response.success)
            {
                setCoupon(response.coupon);
                setCoolDown(true);
                setCountDown(90);
                toast.success("Success",{description:"Coupon claimed successfully"});
            }
            else
            {
                  setError(response.message);
                  if(response.cooldown)
                  {
                    setCoolDown(true);
                    setCountDown(response.cooldownRemaining)
                  }
            }
        }
        catch(err)
        {
            console.log("Error in claiming coupon",err);
            setError('Failed to claim coupon. Please try again later.');
        }
    }

    const copyToclipboard=async()=>{
        try{
            await navigator.clipboard.writeText(coupon.code);
            toast.success("Copied",{description:"Coupon code copied to clipboard"});
        }
        catch(err)
        {
            console.log("Error in copying",err);
            toast.error("Error",{description:"Failed to copy"});
        }
    }

  return (
    <Card className="max-w-md w-full mx-auto overflow-hidden shadow-lg border-t-4 border-t-blue-600">
        
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6">
          <div className="flex justify-center items-center mb-3">
            <div className="mt-4 bg-blue-600 text-white p-3 rounded-full">
              <Gift size={24} />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">Claim Your Discount</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Get a special offer exclusively for you
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          {coupon ? (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-green-800 mb-2 flex flex-col gap-2">
                <Badge variant="success" className="bg-green-600">EXCLUSIVE</Badge>
                Your Coupon Code:
              </h3>
              <div 
                onClick={copyToclipboard}
                className="bg-white p-4 border border-dashed border-green-300 rounded-md text-lg font-mono flex items-center justify-between cursor-pointer hover:bg-green-50 transition">
                <span className="font-semibold tracking-wide">{coupon.code}</span>
                <ClipboardCopy size={18} className="text-green-700" />
              </div>
              <p className="mt-3 text-sm text-green-700">
                {coupon.message}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <p className="text-sm font-medium text-green-800">
                  <span className="text-xl font-bold">{coupon.discount}%</span> discount
                </p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <Clock size={14} />
                  Valid until: {new Date(coupon.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : cooldown ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex justify-center items-center mb-2">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Clock size={24} className="text-amber-600" />
                </div>
              </div>
              <h3 className="font-medium text-amber-800 text-center mb-2">
                Cooldown Period Active
              </h3>
              <p className="text-amber-700 text-center text-sm">
                You can claim another coupon in:
              </p>
              <div className="mt-2 text-2xl font-bold text-amber-800 text-center">
                {countdown} seconds
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 text-base mb-5 text-center px-2">
                Get your exclusive discount code with just one click. 
                Limited availability, claim now!
              </p>
              <Button
                onClick={claimCoupon}
                className=" cursor-pointer w-full bg-blue-600 hover:bg-blue-950 text-white font-medium py-6 px-4 rounded-md transition duration-150 ease-in-out text-lg"
              >
                Claim Your Coupon
              </Button>
            </div>
          )}
          
          {error && !cooldown && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="bg-gray-100 border-t border-gray-100 px-6 py-3">
          <div className="w-full text-xs text-gray-500 text-center">
            <p>Limited to one coupon per user every 30 seconds.</p>
            <p className="mt-1 mb-3">We use secure tracking to ensure fair distribution of offers.</p>
          </div>
        </CardFooter>
  </Card>
  )
}

export default GetCoupon