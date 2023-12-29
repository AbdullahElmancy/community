const postCollection = require("../../../DB/models/post");

const updatePost = async(req,res)=>{
try {
    let {id} = req.params
    let findPost = await postCollection.findById(id)
    if(findPost){
        if(findPost.userID.toString() == req.user._id){
            let updateOldPost;
            let {title,description}= req.body
            let allPic = []
            console.log(req.files);
            if(req.files.length > 0){
                for (let index = 0; index < req.files.length; index++) {
                    let imageURL = `${req.protocol}://${req.headers.host}/${req.files[index].path}`
                    allPic.push(imageURL)
                }
                updateOldPost = await postCollection.findByIdAndUpdate(id,{title,description,images:allPic},{new:true})
            }else{
                updateOldPost = await postCollection.findByIdAndUpdate(id,{title,description},{new:true})
            }
            res.status(200).json({message:"post has been update",updateOldPost})
        }else{
            res.status(404).json({message:"you don't allow delte this post"})
        }
    }else{
        res.status(404).json({message:"post isn't exist"})
    }
} catch (error) {
    res.status(505).json({message:"server error"})
}
}

module.exports = updatePost