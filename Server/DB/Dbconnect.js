const mongoose=require("mongoose");

module.exports=async()=>{
    const dbUrl=process.env.DATABASE_URL
    


    mongoose.connect(dbUrl,{
    }).then(()=>console.log("database connected")).catch((e)=>console.log("error",e))
    
}