import mongoose  from "mongoose";
import { ObjectId } from 'mongodb';

const ClaimedCouponSchema=mongoose.Schema({
  couponId: mongoose.Schema.Types.ObjectId,
  code: String,
  message:String,
  discount:String,
  ip: String,       
  cookieId: String,     
  claimedAt: Date 
});


const ClaimedCoupon=mongoose?.models.ClaimedCoupon || mongoose.model("ClaimedCoupon",ClaimedCouponSchema);
export default ClaimedCoupon; 