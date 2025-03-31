'use server'

const handleEditCoupon =async(formData) => {
    const couponData={
        id:formData.get('id'),
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

      try
      {
        const data = await fetch(`/api/edit-coupon`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(couponData)
          });

          const response=await data.json();

          if(response.success)
            return {success:true,message:response.message};
        else
            return {success:false,message:response.message};
      }
      catch(err)
      {
         console.log("Error in updating coupon",err);
      }
    
}

export default handleEditCoupon;