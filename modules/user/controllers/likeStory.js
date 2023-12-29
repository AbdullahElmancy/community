const userCollection = require("../../../DB/models/user");

const likeStory = async(req,res)=>{
   try {
    let {id} = req.params
    let findUser = await userCollection.findById(id)
    if(findUser){
        if(findUser.story){
            if (findUser.story.likes.includes(req.user._id)) {
                res.status(404).json({message:"You liked this story before"})
            }else{
                findUser.story.likes.push(req.user._id)
                let updateLike = await userCollection.findByIdAndUpdate(id,{story:findUser.story},{new:true})
                res.status(201).json({message:"User liked this story",story: updateLike.story})
            }
           
        }else{
            res.status(404).json({message:"That is not story"})
        }
    }else{
        res.status(404).json({message:" user is not exist"})
    }
   } catch (error) {
    res.status(505).json({message:"Server error",error})

   }
}
module.exports = likeStory