const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")
const CryptoJS = require("crypto-js");

const userSchema = new Schema({
  userName: {
    type: String,
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
  role : {type:String,default:"user"}
});

userSchema.pre("validate",function(next){
  console.log(this.password);
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND));
    this.phone = CryptoJS.AES.encrypt(this.phone, process.env.KEYCRYPT).toString();
    next()
})

const userCollection = model("user",userSchema)

module.exports = userCollection


