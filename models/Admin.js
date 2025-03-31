import mongoose  from "mongoose";

const AdminSchema=mongoose.Schema({
  name:{
     type:String,
     default:null
  } ,
  email: String,
  password: String,     
  role:String,         
});


const Admin=mongoose?.models?.Admin || mongoose.model("Admin",AdminSchema);
export default Admin; 