'use server'

const handleDeleteCoupon =async(id) => {
      try
      {
        const data = await fetch(`/api/delete-coupon`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id})
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

export default handleDeleteCoupon;