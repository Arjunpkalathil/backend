const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username fieled can\'t be empty'],
        
    },
    email:{
        type:String,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'please provide a valid email',

        }

    },
    password:{
        type:String,
        required:[true,'password  fieled can\'t be empty'],
        minlength:[6,'password is too short minimum 6 characters']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
        required:true
    }
},{timestamps:true})

UserSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

UserSchema.methods.CreateJwt=function(){
return jwt.sign({user:this.username,role:this.role,userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE})

}

UserSchema.methods.comparePassword=async function(ClientPassword){

    const isMatch=await bcrypt.compare(ClientPassword,this.password)
    return isMatch 
}


module.exports=mongoose.model('userSchema',UserSchema)