const {StatusCodes}=require('http-status-codes')
const customError=require('../errors/index')
const jwt =require('jsonwebtoken')

const authentication=(req,res,next)=>{
const authHeader=req.headers.authorization
if(!authHeader || !authHeader.startsWith('Bearer') ){
throw new customError.unauthenticated('authentication failed')
}
let token=authHeader.split(' ')[1]
const {user,role,userId}=jwt.verify(token,process.env.JWT_SECRET)
req.user={user,role,userId}
next()
}

const authorization=(role)=>{
    return (req,res,next)=>{
        if(req.user.role !== role){
            throw new customError.unauthenticated('your not authorized to access this route')
        }
        next()
    }

}

module.exports={authentication,authorization}