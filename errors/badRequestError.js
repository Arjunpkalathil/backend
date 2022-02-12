const {StatusCodes}=require('http-status-codes')
const CustomApiError=require('./custom-error')

class badRequestError extends CustomApiError{
    constructor(message){
        super(message)
        this.StatusCodes=StatusCodes.BAD_REQUEST
    }
}

module.exports=badRequestError