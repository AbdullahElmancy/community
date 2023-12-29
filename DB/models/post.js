const { Schema, model } = require("mongoose");
const replySchema = new Schema({
    description:{
        type:String,
    },
    userID:{type:Schema.Types.ObjectId,required:true},
    tags:[Schema.Types.ObjectId],
    like:[Schema.Types.ObjectId],
})
const commentSchema = new Schema({
    description:{
        type:String,
    },
    userID:{type:Schema.Types.ObjectId,required:true},
    tags:[Schema.Types.ObjectId],
    like:[Schema.Types.ObjectId],
    reply:[replySchema]
})

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    images: [String],
    userID:{type:Schema.Types.ObjectId,required:true},
    tags:[Schema.Types.ObjectId],
    like:[Schema.Types.ObjectId],
    comment:[commentSchema],

})

const postCollection = model("post",postSchema)

module.exports = postCollection