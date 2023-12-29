const userCollection = require("../../../DB/models/user");

const followers = async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await userCollection.findById(id);
    if (findUser) {
      if (findUser.accountStatus == "active") {
        let checkUserFollow = findUser.follower.find(
          (ele) => ele.toString() == req.user._id
        );
        if (checkUserFollow == undefined) {
          findUser.follower.push(req.user._id);
          await userCollection.findByIdAndUpdate(id, {
            follower: findUser.follower,
          });
          res.status(201).json({ message: "successful follow" });
        } else {
          res.status(404).json({ message: "You followed this user" });
        }
      } else {
        res.status(404).json({ message: " This user is blocked" });
      }
    } else {
      res.status(404).json({ message: " This user is not exist" });
    }
  } catch (error) {
    res.status(404).json({ message: "Server error", error });
  }
};

module.exports = followers;
