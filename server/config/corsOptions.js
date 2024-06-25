const allowedOrigins=[
    'http://localhost:3000',
    'http://localhost:5500'

]
const corsOption={
    origin:(origin,callback)=>{
        if(allowedOrigins.indexOf(origin)!==-1||!origin){
            callback(null,true)
        }
        else
        callback(new Error("not allowed by CORS"))

    },
    credentials:true,
    optionsSuccessStatus:200,
    allowedHeaders: ['Authorization', 'Content-Type'] 
}
module.exports=corsOption