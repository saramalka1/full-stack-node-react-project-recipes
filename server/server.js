require("dotenv").config()
const express=require("express")
const cors=require("cors")
const cookieParser=require('cookie-parser')
const corsOptions=require('./config/corsOptions')
const connectDB=require('./config/dbConn')
const  mongoose  = require("mongoose")

const PORT=process.env.PORT||2003

const app=express()

connectDB()
//middlware
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))
//routes
app.use('/api/auth',require('./routes/authRoute'))
app.use('/api/users',require('./routes/userRoute'))
app.use('/api/recipes',require('./routes/recipeRoute'))
app.use('/api/category',require('./routes/categoryRoute'))


app.get("/",(req,res)=>{
    res.send("home page")
})

mongoose.connection.once('open',()=>{
    console.log('connected to DBmongo');
    app.listen(PORT,()=>{
        console.log(`server runing on port ${PORT}`);
    })
})

mongoose.connection.on('error',err=>{
    console.log(err)
})


