const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve().catch((err) => next(err))
    }
}  







// const asyncHandler=(fn) => async(req,res,next) => {
//     try{
//         await fn(req,res,next);
//     }
//     catch(eror){
//         res.status(500).json({
//             success: false,
//             message: eror.message
//         })
//     }
// }