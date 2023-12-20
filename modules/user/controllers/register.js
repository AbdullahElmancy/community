const jwt= require("jsonwebtoken")
const userCollection = require("../../../DB/models/user")
const sendMessage = require("../../../public/functions/sendMessage")

const signUp = async(req,res)=>{
   try {
    let {email,password}= req.body
    let findUser = await userCollection.findOne({email:email})
    if(findUser){
        res.status(404).json({message:"user exist"})
    }else{
            let addUser = new userCollection({email,password})
            let saveUser = await addUser.save()
            let token = jwt.sign({email:email},process.env.TOKENKEY,{ expiresIn: 60 * 60 })
            let refreshToken = jwt.sign({email:email},process.env.TOKENKEY)
            let tokenURL = `<a href= '${req.protocol}://${req.headers.host}/user/confirmed/${token}'>confirmed password</a>
            <a href= '${req.protocol}://${req.headers.host}/user/confirmed/${refreshToken}'>refresh password</a>
            `
            sendMessage(tokenURL,email)
            res.status(200).json({message:"success add",saveUser})
    }
   } catch (error) {
    res.status(505).json({message:error})
   }
}
module.exports = signUp