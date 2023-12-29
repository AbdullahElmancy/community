const postCollection = require("../../../DB/models/post");
const userCollection = require("../../../DB/models/user");
const sendMessage = require("../../../public/functions/sendMessage");

const addPost = async(req,res)=>{
try {
    let {title,description,tags}= req.body
    let allPic = []
    let validTags = []
    let tagEmail = ""
    
    if(req.files){
        for (let index = 0; index < req.files.length; index++) {
            let imageURL = `${req.protocol}://${req.headers.host}/${req.files[index].path}`
            allPic.push(imageURL)
        }
    }
    if(tags.length != 0){
        for (let index = 0; index < tags.length; index++) {
            let findUser = await userCollection.findById(tags[index])
            if(findUser){
                validTags.push(tags[index])
                if(validTags){
                    tagEmail += tagEmail + ", " + findUser.email
                }else{
                    tagEmail = findUser.email
                }
            }
        }
    }

    sendMessage(` You tage by ${req.user.email}`,tagEmail)
    let addPost = new postCollection({title,description,tags:validTags,userID:req.user._id,images:allPic})
    let savePost = await addPost.save()
    res.status(200).json({message:"post successful",savePost})
} catch (error) {
    res.status(505).json({message:"server error"})
}
}

module.exports = addPost