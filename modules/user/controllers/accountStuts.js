const userCollection = require("../../../DB/models/user")

const accountStatusF = async(req,res)=>{
    try {
        let {id,accountStatus} = req.body
        await userCollection.findByIdAndUpdate(id,{accountStatus})
        res.status(200).json({message:"Account status update"})
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}
module.exports = accountStatusF