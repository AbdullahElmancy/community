const userCollection = require("../../../DB/models/user")
const jwt = require("jsonwebtoken")

const confirmed = async(req,res)=>{
   try {
    let token = req.params.token
    let decodeToken = jwt.verify(token,process.env.TOKENKEY)
    let findUser = await userCollection.findOne({email:decodeToken.email})
    if(findUser){
        if(findUser.confirmed == false){
            let updateConfirm = await userCollection.findOneAndUpdate({email:findUser.email},{confirmed:true},{new:true})
            res.status(201).json({message:' User have confirmed',updateConfirm})
        }else{
            res.status(404).json({message:"User was confirmed"})
        }
    }else{
        res.status(404).json({message:"User is not exist"})
    }
   } catch (error) {
    res.status(500).json({message:"server error",error})
   }
}

module.exports = confirmed