'use server'

const handleToggleStatus=async(id)=>
{
   try {
    const data = await fetch(`/api/toggle-coupon-status`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id})
    });

    const response=await data.json();

    if(response.success)
      return {success: true,message:response.message};
    else
      return {success: false,message: response.message};
  }
  catch(err)
  {
    console.log("Error in updating coupon status", err);
  }
};

export default handleToggleStatus;