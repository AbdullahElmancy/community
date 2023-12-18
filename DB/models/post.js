const { Schema, model } = require("mongoose");
const replySchema = new Schema({
    description:{
        type:String,
        min:3,
        required:true
    },
    userID:{type:Schema.Types.ObjectId,required:true},
    tags:[Schema.Types.ObjectId],
    like:[Schema.Types.ObjectId],
})
const coomentSchema = new Schema({
    description:{
        type:String,
        min:3,
        required:true
    },
    userID:{type:Schema.Types.ObjectId,required:true},
    tags:[Schema.Types.ObjectId],
    like:[Schema.Types.ObjectId],
    reply:replySchema
})

const postSchema = new Schema({
    title:{
        type:String,
        min:3,
        max:32,
        required:true
    },
    description:{
        type:String,
        min:3,
        required:true
    },
    userID:{type:Schema.Types.ObjectId,required:true},
    tags:[Schema.Types.ObjectId],
    like:[Schema.Types.ObjectId],
    comment:coomentSchema,

})

const postCollection = model("post",postSchema)

module.exports = postCollection