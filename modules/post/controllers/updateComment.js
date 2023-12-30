const postCollection = require("../../../DB/models/post");

const updateComment = async (req, res) => {
  try {
    let { description } = req.body;
    let { idPost, idComment } = req.params;
    let findPost = await postCollection.findById(idPost);
    if (findPost) {
      let comment = findPost.comment;
      let flagComment = false;
      for (let index = 0; index < comment.length; index++) {
        if (comment[index]._id.toString() === idComment.toString()) {
          if (req.user._id.toString() === comment[index].userID.toString()) {
            findPost.comment[index].description = description;
            await postCollection.findByIdAndUpdate(idPost, {
              comment: findPost.comment,
            });
            res.status(201).json({ massage: "comment updated" });
            flagComment = true;
            break;
          } else {
            res
              .status(404)
              .json({ massage: "You not allow to update this comment" });
            break;
          }
        }
      }
      if (flagComment === false) {
        res.status(404).json("comment is not exist");
      }
    } else {
      res.status(404).json({ message: "Post not exist" });
    }
  } catch (error) {
    res.status(505).json({ message: "Server error", error });
  }
};

module.exports = updateComment;
