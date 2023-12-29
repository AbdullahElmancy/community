const route = require("express").Router()
const authorization = require("../../middlewares/authntication")
const validationFunc = require("../../middlewares/valdationFunc")
const upload = require("../../public/controllers/multerFunctions")
const accountStatusF = require("./controllers/accountStuts")
const configrationUSer = require("./controllers/configrationUser")
const confirmed = require("./controllers/confirmed")
const followers = require("./controllers/followers")
const gallery = require("./controllers/gallery")
const likeStory = require("./controllers/likeStory")
const signUp = require("./controllers/register")
const signIn = require("./controllers/signIn")
const story = require("./controllers/story")
const {profilePick,coverPick} = require("./controllers/userPick")
const userEndPoint = require("./endPoint")
const accountStatusValidation = require("./validation/accountStatus")
const configrationUSerValidation = require("./validation/configrationUser")
const followersValidsation = require("./validation/followers")
const signInValidition = require("./validation/signIn")
const signUpValidtion = require("./validation/signUp")

route.post("/signUp",validationFunc(signUpValidtion),signUp)
route.post("/signIn",validationFunc(signInValidition),signIn)
route.get("/user/confirmed/:token",confirmed)
route.patch("/user/configration/",authorization(userEndPoint.configration),validationFunc(configrationUSerValidation),configrationUSer)
route.post("/admin/changeStatus/",authorization(userEndPoint.accountStatusE),validationFunc(accountStatusValidation),accountStatusF)
route.patch("/user/follow/:id",authorization(userEndPoint.followers),validationFunc(followersValidsation),followers)
route.patch("/user/profilePick",authorization(userEndPoint.profilePick),upload.single("avatar"),profilePick)
route.patch("/user/coverPick",authorization(userEndPoint.coverPick),upload.array("coverPick"),coverPick)
route.patch("/user/gallery",authorization(userEndPoint.gallery),upload.array("gallery"),gallery)
route.patch("/user/story",authorization(userEndPoint.story),upload.single("storyPic"),story)
route.patch("/user/likeStory/:id",authorization(userEndPoint.likeStory),likeStory)



module.exports = route