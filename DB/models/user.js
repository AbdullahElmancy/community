const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  age: {
    type: Number,
    min: 18,
    max: 65,
  },
  gender: {
    type: String,
    default: "male",
  },
  shareProfileLink: String,
  profilePick: String,
  coverPick: [String],
  socialLinks: [{ String }],
  gallery: Array,
  story: {
    text: { type: String, min: 100 },
    image: { type: [String] },
    likes: { type: [Schema.Types.ObjectId] },
  },
  follower: [Schema.Types.ObjectId],
  accountStatus: String,
  pdfLink: String,
});

userSchema.pre("save",function(next){
    bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND));
    CryptoJS.AES.encrypt(this.phone, KEYCRYPT).toString();
    next()
})

const userCollection = model("user",userSchema)

module.exports = userCollection


