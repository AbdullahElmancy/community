const postCollection = require("../../../DB/models/post");
const userCollection = require("../../../DB/models/user");
const sendMessage = require("../../../public/functions/sendMessage");

const addComment = async(req,res)=>{
  try {
    let {idPost,tags,description} = req.body
    let findPost = await postCollection.findById(idPost)
    if(findPost){
        let validTags = []
        let tagEmail = ""    
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
        findPost.comment.push({description,tags:validTags,userID:req.user._id})
        let addComment = await postCollection.findByIdAndUpdate(findPost._id,{comment:findPost.comment},{new:true})
        res.status(201).json({message:"Successful add",addComment})
    }else{
        res.status(404).json({message:"Post is not exist"})
    }
  } catch (error) {
    res.status(505).json({message:"server error",error})
  }
}

module.exports = addComment