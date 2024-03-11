const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema(
    {
        //של מי הספר(הרשימה)
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        //מערך של המתכונים בספר האישי
        recipes:{
            type:[{type:mongoose.Schema.Types.ObjectId,ref:'Recipe'}]
        }
    },
    {timestamps:true}
)

module.exports=mongoose.model('PersonalBook',bookSchema)