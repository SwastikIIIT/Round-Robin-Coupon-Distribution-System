'use server';

const handleAddCoupon =async(formData) => {
       
    const couponData={
       code:formData.get('code'),
       discount:Number(formData.get('discount')),
       message:formData.get('message'),
       startDate:new Date(formData.get('startDate')),
       endDate:new Date(formData.get('endDate')),
       isActive:formData.get('isActive')==='on'
    }

    if (couponData.endDate < couponData.startDate) {
        return { success: false, message: "End date cannot be before start date" };
      }

    try{
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
           const data=await fetch(`${baseUrl}/api/add-coupon`,{
               method:"POST",
               headers:{"Content-type":"application/json"},
               body:JSON.stringify({
                 couponData
               })
           });

         const response=await data.json();

         if(response.success)
            return {success:true,newCoupon:response.newCoupon,message:response.message};
        else
            return {success:false,message:response.message};

    } 
    catch(err)
    {
        console.log("Error in adding coupon",err);
    }

}

export default handleAddCoupon