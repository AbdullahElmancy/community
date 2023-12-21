const userCollection = require("../../../DB/models/user")
const configrationUSer =async(req,res)=>{
    try {
        let {userName,phone,age,gender,socialLinks} = req.body
        await userCollection.findByIdAndUpdate(req.user._id,{userName,phone,age,gender,socialLinks})
        res.status(201).json({message:"successful update"})
    
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}
module.exports = configrationUSer