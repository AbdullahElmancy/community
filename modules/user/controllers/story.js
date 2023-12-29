const userCollection = require("../../../DB/models/user");

const story = async (req, res) => {
  try {
    if (req.file != undefined) {
      const imageURL = `${req.protocol}://${req.headers.host}/${req.file.path}`;
      if (!req.user.story) {
        let objectStory = {
          image: imageURL,
        };
        const updateImage = await userCollection.findByIdAndUpdate(
          req.user._id,
          { story: objectStory },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "story update", image: updateImage.story });
      } else {
        req.user.story.image = imageURL;
        const updateImage = await userCollection.findByIdAndUpdate(
          req.user._id,
          { story: req.user.story },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "story update", image: updateImage.story });
      }
    } else if (req.body.text) {
      const { text } = req.body;
      if (!req.user.story) {
        let objectStory = {
          text: text,
        };
        const updateText = await userCollection.findByIdAndUpdate(
          req.user._id,
          { story: objectStory },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "story update", text: updateText.story });
      } else {
        req.user.story.text = text;
        const updateText = await userCollection.findByIdAndUpdate(
          req.user._id,
          { story: req.user.story },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "story update", text: updateText.story });
      }
    } else {
      res.status(404).json("invalid story");
    }
  } catch (error) {
    res.status(505).json({message:"Server error",error})
  }
};
module.exports = story;
