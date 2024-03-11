const mongoose=require('mongoose')

const userSchema=mongoose.Schema(
    {
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        trim:true
    },
    //האם רוצה לקבל מייל בעת הוספת מתכון חדש
    getmailoninsert:{
        type:Boolean,
        default:false
    },
    roles:{
        type:String,
        enum:['ADMIN','USER'],
        default:'USER'
    },
    active:{
        type:Boolean,
        default:true,
        required:true
    },
    deleted:{
        type:Boolean,
        default:false,
        required:true
    }
    
},
{timestamps:true}
)

module.exports=mongoose.model('User',userSchema)