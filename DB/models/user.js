const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")
const CryptoJS = require("crypto-js");

const userSchema = new Schema({
  userName: {
    type: String,
    trim: true
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
  profilePick: String,
  coverPick: [String],
  socialLinks: [ String ],
  gallery: Array,
  story: {
    text: { type: String, min: 10 },
    image: { type: String },
    likes: { type: [Schema.Types.ObjectId] },
  },
  follower: [Schema.Types.ObjectId],
  accountStatus: {type:String,default:"active"},
  pdfLink: String,
  role : {type:String,default:"user"},
  confirmed:{type:Schema.Types.Boolean,default:false}
});

userSchema.pre("validate",function(next){
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND));
    this.phone = CryptoJS.AES.encrypt(this.phone, process.env.KEYCRYPT).toString();
    next()
})

const userCollection = model("user",userSchema)

module.exports = userCollection


