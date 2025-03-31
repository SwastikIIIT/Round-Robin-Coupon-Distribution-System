import Coupon from "@/models/Coupon";
import { connectToMongo } from "@/utils/database";

export async function PATCH(req) {
    const {id,isActive} = await req.json();
    try {
        await connectToMongo();
        
        const updatedCoupon=await Coupon.findByIdAndUpdate(
          id,
         {isActive:isActive},
         {new:true});
        
        return Response.json(updatedCoupon);
    } catch (err) {
        return Response.json({ error: "Failed to delete coupon" }, { status: 500 });
    }
}