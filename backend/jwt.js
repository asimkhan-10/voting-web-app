const jwt=require('jsonwebtoken');
//VERIFY
const jwtMiddleWare=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader)
    {
        return res.status(401).json({message:'No token provided'})
    }
    const token=authHeader.split(' ')[1]
    if(!token)
    {
        res.status(401).json({message:'No token provided'})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        res.status(401).json({message:'Invalid token'})
    }
}
const generateToken=(user)=>{
    return jwt.sign(user,process.env.JWT_SECRET,{expiresIn:3000})
}
module.exports={jwtMiddleWare,generateToken}
//For Verification
//main point is to grab the token from the request header, verify it using the secret key, and 
// if valid, attach the decoded payload to the request object for further use in the application. 
// If the token is missing or invalid, it responds with a 401 Unauthorized status.