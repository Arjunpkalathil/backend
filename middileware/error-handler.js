const {CustomApiError}=require('../errors/index')
const {StatusCodes}=require('http-status-codes')

const errorHandler=(err,req,res,next)=>{

  let error={
    message: err.message || 'Something went wrong try again later',
    status:err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR
  }
//  if (err instanceof CustomApiError) {
//    console.log(err.message)
//     return res.status(err.StatusCodes).json({ msg: err.message })
//   }
if (err.name === 'ValidationError') {
    error.message= Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    Error.StatusCodes = 400;
  }
if (err.code && err.code === 11000) {
    error.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.StatusCodes = 400;
  }
  if (err.name === 'CastError') {
    error.message = `No item found with id : ${err.value}`;
    customError.StatusCodes = 404;
  }


  return res
    .status(error.status)
    .send(error.message)
}

module.exports=errorHandler