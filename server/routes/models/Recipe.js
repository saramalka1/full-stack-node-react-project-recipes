const mongoose=require('mongoose')

const recipeSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        imgurl:{
            type:String,
            required:true
        },
        ingredients:{
            type:[String],
            required:true

        },
        instructions:{
            type:[String],
            required:true

        },
        writeruser:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Category'
        },
        type:{
            type:String,
            enum:['DAIRY','MEAT','PARVE']
        },
        score:{
            type:Number
        },
        level:{
            type:String,
            enum:['EASY','HARD','MEDIUM']
        },
        //זמן הכנה
        preparationtime:{
            type:String
        },
        show:{
            type:Boolean,
            default:true
        },
        deleted:{
            type:Boolean,
            default:false,
            required:true
        }


    },{timestamps:true}
)

module.exports=mongoose.model('Recipe',recipeSchema)