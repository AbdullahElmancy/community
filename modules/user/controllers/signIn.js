const userCollection = require("../../../DB/models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signIn = async(req,res)=>{
    try {
        let {email,password}= req.body
        let findUser = await userCollection.findOne({email:email})
        if(findUser){
            let decodePassword = await bcrypt.compare(password,findUser.password)
            if (decodePassword == true) {
                let sendToken = jwt.sign({id:findUser._id},process.env.TOKENKEY,{expiresIn:'7d'})
                res.status(201).json({message:"Welcom to commmuntiy",Token:sendToken})
            }else{
                res.status(404).json({message:"Password or user is wrong "})
            }
        }else{
            res.status(404).json({message:"user is not exist"})
        }
    } catch (error) {
        res.status(505).json({message:error})
    }
}

module.exports= signIn