const userCollection = require("../../../DB/models/user")


const gallery = async(req,res)=>{   
   try {
    if(req.files){     
        for (let index = 0; index < req.files.length; index++) {
            let imageURL =`${req.protocol}://${req.headers.host}/${req.files[index].path}`
            req.user.gallery.push(imageURL)
         }
        const updateImage = await userCollection.findByIdAndUpdate(req.user._id,{gallery:req.user.gallery},{new:true})
        res.status(200).json({message:"gallery pictures update",image: updateImage.gallery})

    }else{
        res.status(404).json({message:"gallery is not exist"})
    }
   } catch (error) {
    res.status(505).json({message:"Server error",error})
   }
}

module.exports = gallery