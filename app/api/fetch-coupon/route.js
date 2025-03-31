import Coupon from "@/models/Coupon";
import { connectToMongo } from "@/utils/database";

export async function GET(req) {
    try {
        await connectToMongo();
        const coupons = await Coupon.find();
        return Response.json(coupons);
    } catch (err) {
        return Response.json({ error: "Failed to fetch coupons" }, { status: 500 });
    }
}