const postCollection = require("../../../DB/models/post");

const updateReply = async (req, res) => {
  try {
    let { idPost, idComment,idReply } = req.params;
    let {description} = req.body
    let findPost = await postCollection.findById(idPost);
    if (findPost) {
      let comment = findPost.comment;
      let flagComment = false;
      let replyFlag = false;
      for (let index = 0; index < comment.length; index++) {
        if (comment[index]._id.toString() === idComment.toString()) {
          flagComment = true
          for (let replyIndex = 0; replyIndex < comment[index].reply.length; replyIndex++) {
            if (comment[index].reply[replyIndex]._id.toString() === idReply.toString()) {
                if (req.user._id.toString()  === comment[index].reply[replyIndex].userID.toString()) {
                    replyFlag = true
                    findPost.comment[index].reply[replyIndex].description = description
                    await postCollection.findByIdAndUpdate(idPost,{comment:findPost.comment})
                    res.status(201).json({massage:"reply updated"})
                    break
                }else{
                    res.status(404).json({massage:"You not allow to delete this reply"})
                    break
                }
            }
          }
        }
      }
      if (flagComment === false) {
        res.status(404).json("comment is not exist");
      }
      if(replyFlag === false){
        res.status(404).json("reply is not exist");
      }
    } else {
      res.status(404).json({ message: "Post is not exist" });
    }
  } catch (error) {
    res.status(505).json({ message: "server error", error });
  }
};

module.exports = updateReply;
