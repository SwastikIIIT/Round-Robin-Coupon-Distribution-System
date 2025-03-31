import Coupon from "@/models/Coupon";
import { connectToMongo } from "@/utils/database";

export async function POST(req) {
    const couponData = await req.json();
    try {
        await connectToMongo();
        
        const newCoupon = await Coupon.create({
            code: couponData.code,
            message: couponData.message,
            discount: couponData.discount,
            startDate: new Date(couponData.startDate),
            endDate: new Date(couponData.endDate),
            isActive: couponData.isActive,
            isClaimed: false
        });
        
        return Response.json(newCoupon);
    } catch (err) {
        return Response.json({ error: "Failed to create coupon" },{ status: 500 });
    }
}