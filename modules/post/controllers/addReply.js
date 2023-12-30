const postCollection = require("../../../DB/models/post");
const userCollection = require("../../../DB/models/user");
const sendMessage = require("../../../public/functions/sendMessage");

const addReply = async (req, res) => {
  try {
    let { idPost, idComment } = req.params;
    let { tags, description } = req.body;
    let findPost = await postCollection.findById(idPost);
    if (findPost) {
      let comment = findPost.comment;
      let flagComment = false;
      for (let index = 0; index < comment.length; index++) {
        if (comment[index]._id.toString() === idComment.toString()) {
          let validTags = [];
          let tagEmail = "";
          if (tags.length != 0) {
            for (let index = 0; index < tags.length; index++) {
              let findUser = await userCollection.findById(tags[index]);
              if (findUser) {
                validTags.push(tags[index]);
                if (validTags) {
                  tagEmail += tagEmail + ", " + findUser.email;
                } else {
                  tagEmail = findUser.email;
                }
              }
            }
          }
          sendMessage(` You tage by ${req.user.email}`, tagEmail);
          findPost.comment[index].reply.push({
            description,
            tags: validTags,
            userID: req.user._id,
          });
          let addReply = await postCollection.findByIdAndUpdate(
            findPost._id,
            { comment: findPost.comment },
            { new: true }
          );
          res.status(201).json({ message: "Successful add reply", addReply });
          flagComment = true;
          break;
        }
      }
      if (flagComment === false) {
        res.status(404).json("comment is not exist");
      }
    } else {
      res.status(404).json({ message: "Post is not exist" });
    }
  } catch (error) {
    res.status(505).json({ message: "server error", error });
  }
};

module.exports = addReply;
