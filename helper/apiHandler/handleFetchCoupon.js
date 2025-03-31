'use server';

const handleFetchCoupon =async()=>{
       

    try{
           const baseUrl = process.env.NEXT_PUBLIC_API_URL;
           const data=await fetch(`${baseUrl}/api/fetch-coupon`);
         const response=await data.json();

         if(response.success)
            return {success:true,coupons:response.coupons,message:response.message};
        else
            return {success:false,message:response.message};

    } 
    catch(err)
    {
        console.log("Error in fetching coupon",err);
    }

}

export default handleFetchCoupon