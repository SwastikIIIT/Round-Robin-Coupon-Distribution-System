import mongoose  from "mongoose";

const CouponSchema=mongoose.Schema({
  code: String,           
  message: String,      
  discount: String,     
  isActive:{
    type: Boolean,
    default: true
  } ,                  
  claimedBy: {
     type:[String],
      default:[]
  },  
  startDate:{
    type:Date,
    default:Date.now
  },                  
  endDate:{
     type:Date,
     default:null 
  },
  createdAt: {
    type:Date,
    default:Date.now 
  }                        
});


const Coupon=mongoose?.models.Coupon || mongoose.model("Coupon",CouponSchema);
export default Coupon; 