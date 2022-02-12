const customError =require('../errors/index')
const User =require('../models/user')
const {StatusCodes}=require('http-status-codes')

const register=async(req,res)=>{
    const admin = (await User.countDocuments({})) === 0;
  const role = admin ? "admin" : "user";

  const user=await User.create({...req.body,role})
  const jwt= user.CreateJwt()
    res.status(StatusCodes.CREATED).json({user:jwt,msg:"successfully registerd!.."})
}

const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new customError.badRequestError('please provide your credentials')
    }
    const user=await User.findOne({email})  
    if(!user){
        throw new customError.unauthenticated('your email is not registerd')
    }

    const isMatch=await user.comparePassword(password)
    if(!isMatch){
        throw new customError.unauthenticated('please verify your password')
    }
    const jwt=user.CreateJwt()

    res.status(200).json({user:jwt,msg:'successfully Logged!...'})
    
}


module.exports={register,login}