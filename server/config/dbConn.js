const { default: mongoose } = require("mongoose")
//מגדיר חיבור
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch(er){
        console.error("error connection to DB :"+er)
    }
}
module.exports=connectDB