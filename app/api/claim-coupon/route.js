import Coupon from "@/models/Coupon";
import ClaimedCoupon from "@/models/ClaimedCoupon";
import { connectToMongo } from "@/utils/database";
import { cookies } from "next/headers";

const COOLDOWN_PERIOD = 90 * 1000;

export async function POST(req)
{
       try
       {
            await connectToMongo();

            const clientIp = req.headers.get('x-forwarded-for');

            const cookieStore =await cookies();
            let cookieId = cookieStore.get('sessionId')?.value;

            
            if (!cookieId) {
                cookieId = Math.random().toString(36).substring(2) + Date.now().toString(36);
                cookieStore.set('sessionId', cookieId, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV!=='development',
                    maxAge: 60*60*24*30, // 30 days in seconds
                    path: '/'
                });
            } 
            console.log("Ip:",clientIp,"Cookie",cookieId);

            //check for claim with user ip and cookie
            const lastClaim=await ClaimedCoupon.findOne({
                $or:[
                    {ip:clientIp},
                    {cookieId:cookieId}
                ],
                claimedAt:{$gt:new Date(Date.now()-COOLDOWN_PERIOD)}
            });

            console.log("Last Claim",lastClaim);
            if (lastClaim){
                const timeLeft = Math.ceil((lastClaim.claimedAt.getTime() + COOLDOWN_PERIOD - Date.now())/ 
                    (1000));

            console.log("Last Claimed:",lastClaim);

             return Response.json({success:false,message:`You've already claimed a coupon. Please try again in ${timeLeft} seconds`,cooldownRemaining:timeLeft,status:400,cooldown:true});
            }

            //Round-robin fashion
            const coupon=await Coupon.findOne({
                claimedBy: { $ne: clientIp },
                isActive:true,
                // startDate:{$lte:new Date()},
                // endDate:{$gte:new Date()}
            }).sort({ createdAt:1});
            

            console.log("Coupon that can be accessed or claimed",coupon);
            if(!coupon) {
              return Response.json({success:false,message: 'No coupons available at this time',status:400});
            }
    
            coupon.claimedBy.push(clientIp);
            await coupon.save();

            const claimedCoupon=await ClaimedCoupon.create({
                couponId:coupon._id,
                code:coupon.code,
                message:coupon.message,
                discount:coupon.discount,
                ip:clientIp,
                cookieId:cookieId,
                claimedAt:new Date()
            })

            return Response.json({success:true,message:'Coupon claimed successfully!',
                coupon: {
                    code: coupon.code,
                    message: coupon.message,
                    discount: coupon.discount,
                    endDate: coupon.endDate
                }
            });
        }
       catch(err)
       {
            console.log("Error claiming coupon",err);
            return Response.json({success:false,message:'Server error, please try again later.',status:500});
       }
}