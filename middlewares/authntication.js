var jwt = require('jsonwebtoken');
const userCollection = require('../DB/models/user');

const authorization = (roleUser)=>{
  try {
    return async(req,res,next)=>{
        let authorithationToken = req.headers["authorization"]
        if(!authorithationToken || !authorithationToken.startswith("Bearer")){
            res.status(404).json({message:"invallid token"})
        }else{
            let token = authorithationToken.slice(7)
            let {id} = jwt.verify(token, process.env.SECRETJWT);
            let user = await userCollection.findById(id).select("-password")
            if(!user){
                res.status(404).json({message:"user is nont exist"})
            }else{
                req.user = user
                if(roleUser.includes(user.role)){
                    next()
                }else{
                    res.status(404).json({message:"you not allow to access"})
                }
            }        
        }
    }
  } catch (error) {
    res.json({message:"server error",error})
  }
}
module.exports = authorization