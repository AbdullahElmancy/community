const postCollection = require("../../../DB/models/post");

const getUserPosts = async(req,res)=>{
try {
    let {page,limit}= req.query
    if(!page){
        page = 1
    }
    if(!limit){
        limit = 4
    }
    let skipItem = (page -1) * limit
    let findPost = await postCollection.find({userID:req.user._id}).select("-password").limit(limit).skip(skipItem)
    res.status(200).json({message:"allPost",findPost})
} catch (error) {
    res.status(505).json({message:"Server error",error})
}

}
module.exports = getUserPosts