const postCollection = require("../../../DB/models/post")


const getComment = async(req,res)=>{
    try {
        let {idPost} = req.params
        let findPost = await postCollection.findById(idPost);
        if (findPost) {
            res.status(201).json({massage:":comments",comments:findPost.comment});
        } else {
          res.status(404).json({ message: "Post not exist" });
        }
    } catch (error) {
        res.status(505).json({message:"Server error",error})
    }
}

module.exports = getComment