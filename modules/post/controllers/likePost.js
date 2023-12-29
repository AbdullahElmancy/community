const postCollection = require("../../../DB/models/post");

const likePost  = async(req,res)=>{
   try {
    let {id} = req.params
    let findPost = await postCollection.findOne({_id:id})
    if(findPost){
        if(findPost.like.includes(req.user._id)){
            res.status(404).json({message:"You liked it before"})
        }else{
            findPost.like.push(req.user._id)
            let updatePost = await postCollection.findByIdAndUpdate(id,{like:findPost.like},{new:true})
            res.status(200).json({message:"successfull like",updatePost})
        }
    }else{
        res.status(404).json({message:"post not exist"})
    }
   } catch (error) {
    res.status(505).json({message:"Server error",error})
   }
}
module.exports = likePost