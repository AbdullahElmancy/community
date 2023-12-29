const rolers = {
    User:"user",
    HR:"hr",
    Admin:"admin"
}
const userEndPoint = {
    configration: [rolers.User,rolers.HR],
    accountStatusE:rolers.Admin,
    profilePick: [rolers.User,rolers.HR],
    followers: [rolers.User,rolers.HR],
    gallery: [rolers.User,rolers.HR],
    story: [rolers.User,rolers.HR],
    likeStory: [rolers.User,rolers.HR],
    coverPick: [rolers.User,rolers.HR],
}

module.exports = userEndPoint