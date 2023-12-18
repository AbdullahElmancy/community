const { Schema , model } = require("mongoose");

const reportSchema = new Schema({
    title:String,
    reporter:Schema.Types.ObjectId,
    accountID:Schema.Types.ObjectId,
    postID:Schema.Types.ObjectId,
    massage:String,
    status:Schema.Types.Boolean
})

const reportCollection = model("report",reportSchema)
module.exports = reportCollection

