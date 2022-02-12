require('dotenv').config()
require('express-async-errors')
const express=require('express')
const app=express()
const connectDB =require('./connectDB/connectDB')
const cloudinary=require('cloudinary').v2
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
const notFound =require('./middileware/notFound')
const errorHandler =require('./middileware/error-handler')
//authrouter
const authRouter=require('./routes/auth')
//blogauth
const blogRouter=require('./routes/blog')
const fileUpload=require('express-fileupload')
const cors=require('cors')
app.use(cors())
app.use(fileUpload({useTempFiles:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth/',authRouter)
app.use('/api/blog/',blogRouter)

app.use(notFound)
app.use(errorHandler)
let PORT=process.env.PORT || 5000;
const Start=async()=>{
    try {
    await connectDB(process.env.MONGO_URL)
    app.listen(PORT,()=>console.log("port running on 5000"))
        
    } catch (error) {
        console.log(error)
    }
}

Start()