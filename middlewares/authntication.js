const userCollection = require("../DB/models/user");
let jwt = require("jsonwebtoken");

const authorization = (roleUser) => {
  return async (req, res, next) => {
    try {
      let authorithationToken = req.headers["authorization"];
      if (!authorithationToken || !authorithationToken.startsWith("Bearer")) {
        res.status(404).json({ message: "invallid token" });
      } else {
        let token = authorithationToken.split(" ")[1];
        jwt.verify(token, process.env.TOKENKEY, async function (err, decode) {
          if (err) {
            res
              .status(404)
              .json({ message: " This is not correct token", err });
          } else {
            let user = await userCollection
              .findById(decode.id)
              .select("-password");
            if (!user) {
              res.status(404).json({ message: "user is nont exist" });
            } else {
              if (user.accountStatus == "active") {
                req.user = user;
                if (roleUser.includes(user.role)) {
                  next();
                } else {
                  res.status(404).json({ message: "you not allow to access" });
                }
              } else {
                res
                  .status(404)
                  .json({ messge: "You are blocked by community" });
              }
            }
          }
        });
      }
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  };
};
module.exports = authorization;
