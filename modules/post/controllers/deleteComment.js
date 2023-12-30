const postCollection = require("../../../DB/models/post");

const deleteComment = async(req,res)=>{
    try {
        let {idComment,idPost} = req.params
        let findPost = await postCollection.findById(idPost)
        if(findPost){
            let comment = findPost.comment
            let flagComment = false;
            for (let index = 0; index < comment.length; index++) {
                if(comment[index]._id.toString() === idComment.toString() ){
                    if (req.user._id.toString()  === comment[index].userID.toString()) {
                        findPost.comment.splice(index,1)
                        await postCollection.findByIdAndUpdate(idPost,{comment:findPost.comment})
                        res.status(201).json({massage:"comment Deleted"})
                        flagComment = true
                        break
                    }else{
                        res.status(404).json({massage:"You not allow to delete this comment"})
                        break
                    }
                   
                }
            }
            if(flagComment === false){
                res.status(404).json("comment is not exist")
            }
    
        }else{
            res.status(404).json({message:"Post not exist"})
        }
    } catch (error) {
        res.status(505).json({message:"Server error"})
    }
}

module.exports = deleteComment