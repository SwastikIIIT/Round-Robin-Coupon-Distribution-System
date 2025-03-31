import Coupon from "@/models/Coupon";
import { connectToMongo } from "@/utils/database";

export async function POST(req) {
    const {id} = await req.json();
    try {
        await connectToMongo();
        
        await Coupon.findByIdAndDelete(id);
        
        return Response.json({success:true});
    } catch (err) {
        return Response.json({error:"Failed to delete coupon",status:500});
    }
}