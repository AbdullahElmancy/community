const userCollection = require("../../../DB/models/user")

const signUp = async(req,res)=>{
    let {email,password,cpassword}= req.body
    let findUser = await userCollection.findOne({email:email})
    if(findUser){
        res.status(404).json({message:"user exist"})
    }else{
        
            let addUser = new userCollection({email,password})
            let saveUser = await addUser.save()
            res.status(200).json({message:"success add",saveUser})
        
    }
}
module.exports = signUp