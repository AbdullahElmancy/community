const postCollection = require("../../../DB/models/post")

const deletePost = async(req,res)=>{
  try {
    let {id} = req.params
    let findPost = await postCollection.findById(id)
    if(findPost){
        if(findPost.userID.toString() == req.user._id){
            await postCollection.deleteOne({_id:id})
            res.status(200).json({message:"The post has been successfully deleted"})
        }else{
            res.status(404).json({message:"you don't allow delte this post"})
        }
    }else{
        res.status(404).json({message:"post isn't exist"})
    }
  } catch (error) {
    res.status(505).json({message:"server error",error})
  }
}
module.exports = deletePost