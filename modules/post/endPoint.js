const rolers = {
    User:"user",
    HR:"hr",
    Admin:"admin"
}
const postEndPoint = {
    addPost:[rolers.User,rolers.HR],
    updatePost:[rolers.User,rolers.HR],
    deletePost:[rolers.User,rolers.HR,rolers.Admin],
    getPost:[rolers.User,rolers.HR,rolers.Admin],
    like:[rolers.User,rolers.HR],
    addComment:[rolers.User,rolers.HR],
    updateComment:[rolers.User,rolers.HR],
    deleteComment:[rolers.User,rolers.HR,rolers.Admin],
    addReply:[rolers.User,rolers.HR],
    updateReply:[rolers.User,rolers.HR],
    deleteReply:[rolers.User,rolers.HR,rolers.Admin],
}

module.exports = postEndPoint