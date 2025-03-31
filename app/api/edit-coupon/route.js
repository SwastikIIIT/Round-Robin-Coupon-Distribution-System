import Coupon from "@/models/Coupon";
import { connectToMongo } from "@/utils/database";

export async function PUT(req) {
    const couponData = await req.json();
    try {
        await connectToMongo();
        
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            couponData._id,
            {
                code: couponData.code,
                message: couponData.message,
                discount: couponData.discount,
                startDate: new Date(couponData.startDate),
                endDate: new Date(couponData.endDate),
                isActive: couponData.isActive
            },
            {new:true}
        );
        
        return Response.json(updatedCoupon);
    } catch (err) {
        return Response.json({ error: "Failed to update coupon" }, { status: 500 });
    }
}