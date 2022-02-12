const notFound=(req,res)=>res.status(404).json({msg:'Route Does not exist'})

module.exports=notFound