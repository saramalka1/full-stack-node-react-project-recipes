const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema(
    {
       writeruser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
       },
       recipe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recipe'
       },
       text:{
        type:String,
        required:true
       },
       show:{
        type:Boolean,
        required:true,
        default:true
       }
    },{timestamps:true}
)

module.exports=mongoose.model('Comment',commentSchema)