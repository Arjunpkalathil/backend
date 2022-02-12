const {StatusCodes}=require('http-status-codes')
const CustomApiError=require('./custom-error')

class unauthenticated extends CustomApiError{
    constructor(message){
        super(message)
        this.StatusCodes=StatusCodes.UNAUTHORIZED 
       }
}

module.exports=unauthenticated