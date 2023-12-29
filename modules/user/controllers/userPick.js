const userCollection = require("../../../DB/models/user")
const profilePick = async(req,res)=>{ 
      try {
        if(req.file){
            const imageURL =`${req.protocol}://${req.headers.host}/${req.file.path}`
            const updateImage = await userCollection.findByIdAndUpdate(req.user._id,{profilePick:imageURL},{new:true})
            res.status(200).json({message:"Profile picture update",image: updateImage.profilePick})
    
        }else{
            res.status(404).json({message:"Avatr is not exist"})
        }
      } catch (error) {
        res.status(505).json({message:"Server error",error})
      }
}

const coverPick = async(req,res)=>{   
try {
    if(req.files){
        let allPick =[]
        for (let index = 0; index < req.files.length; index++) {
            let imageURL =`${req.protocol}://${req.headers.host}/${req.files[index].path}`
            allPick.push(imageURL)
         }
        const updateImage = await userCollection.findByIdAndUpdate(req.user._id,{coverPick:allPick},{new:true})
        res.status(200).json({message:"Profile cover pictures update",image: updateImage.coverPick})

    }else{
        res.status(404).json({message:"cover is not exist"})
    }
} catch (error) {
    res.status(505).json({message:"Server error",error})
}
}
module.exports = {profilePick,coverPick}
