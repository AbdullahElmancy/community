# Community
Community is API Social networking site, you can register and Login, add post or comment, delete post or comment, modify post or comment and reply comment. And to apply what I’m learn, I make this app Start with create server act as http and connection with database (MongoDB) by using mongoose then use hashing to hash password using bycyrbt package from NPM manager and crypt.js   to decode the phone number and how to deal with modules then make end point and make middleware to validation by using Joi, authorization ,using JWT to make decode to id to send him to header to allow you to make add or access to some end point ,end with sending email and add image by single or multiple and verify email of the user then how to upload this project to git hub and deal with deployment.Finaly this abbreviation and there are many details inside project 
<br/>

## API Documentation
* *[user](#-1-user)
* *[post](#-2-post)
* *[report](#-3-report)

<br/>

## # 1. user

### usermodel
| **Property** | **description** |
--- | --- |
|_id| Primary key.
|userName|The name of user.
|email| The email of user.
|password| The password of user.
|phone|The phone number of user.
|age| The age of user.
|gender|The gender of user.
|shareProfileLink| Profile link of user.
|profilePick| Avatar of user.
|coverPick| Cover the main page of user.
|socialLinks| Social linkes of user.
|gallery|: Gallery of user.
|story|: Story of user.
|follower|:Follower who is follow page of user.
|accountStatus|: Account status of user.
|pdfLink| : Pdf attach.
|role|: The user role.

<br/>

### Users End Point
| **Endpoint** | **Method** |
--- | --- |
|/signUp|POST.

### Json Format
* **/signUp** 
```json
{
    "email":"hambazoo@gmail.com",
    "password":"Password1$$",
    "cpassword":"Password1$$",
}
```



<div align="right">
    <b><a href="#API-Documentation">↥ back to top</a></b>
</div>


## Table of Contents

* *[express.js](#-1-expressjs)
* *[database](#-2-DataBase)
* *[middlewares](#-3-middlewares)
* *[controllers](#-4-controller)

<br/>

## # 1. Expressjs
Express.js is framework for node Without Express JS, you must write your own code to create a routing component, which is time-consuming and labor-intensive. ExpressJS provides programmers with simplicity, flexibility, efficiency, minimalism, and scalability

I started create project so call express js and put listen to port I used dot env to hide port that's more secure

I used express.json beacuse parse incoming request (buffer) to json form data base

```js
const express = require("express")
const app = express()
require('dotenv').config()
const portListen = process.env.PORT
app.use(express.json())

app.listen(portListen,()=> console.log("work"))

```

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

<br/>

## # 2.DataBase
I used NO-SQL Databse (mongooDB) by using mongoose package 

first I maked module of method to connect DataBase
```js
const  Mongoose  = require("mongoose");

const connectionDB = ()=>{
    Mongoose.connect(process.env.DATABASE)
    .then(()=>console.log("connect"))
    .catch(err=> console.log(err))
}

module.exports = connectionDB
```
then I called this method in app.js
```js
const express = require("express")
const connectionDB = require("./DB/DBConnection")
const app = express()
require('dotenv').config()

const portListen = process.env.PORT
connectionDB()

app.use(express.json())

app.listen(portListen,()=> console.log("work"))

```
after I checked with connection DB, I have made models

* **User MODEL** 

I have started to make sckema thats contain
```js
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")
const CryptoJS = require("crypto-js");

const userSchema = new Schema({
  userName: {type: String,lowercase: true,trim: true},
  email: {type: String,unique: true,required: true,lowercase: true,trim: true},
  password: {type: String,required: true,},
  phone: String,
  age: {type: Number,min: 18,max: 65,},
  gender: {type: String,default: "male",},
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
```
and then maked hook to hash password and crypt phone number before the data save in collection

```js
userSchema.pre("validate",function(next){
  console.log(this.password);
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND));
    this.phone = CryptoJS.AES.encrypt(this.phone, process.env.KEYCRYPT).toString();
    next()
})
```
finally maked model and export it
```js
const userCollection = model("user",userSchema)
module.exports = userCollection
```

* **POST MODEL**

after I had made user model , I Strated to make post

schema post thats contain nested schema of comment and nested shema of comment have to nested schema of reply
```js
const { Schema, model } = require("mongoose");
const replySchema = new Schema({
    description:{type:String,min:3,required:true},
    userID:{type:Schema.Types.ObjectId,required:true},
    tags:[Schema.Types.ObjectId],
    like:[Schema.Types.ObjectId],
})
const coomentSchema = new Schema({
    description:{type:String,min:3,required:true},
    userID:{type:Schema.Types.ObjectId,required:true},
    tags:[Schema.Types.ObjectId],
    like:[Schema.Types.ObjectId],
    reply:replySchema
})

const postSchema = new Schema({
    title:{type:String,min:3,max:32,required:true},
    description:{type:String,min:3,required:true},
    userID:{type:Schema.Types.ObjectId,required:true},
    tags:[Schema.Types.ObjectId],
    like:[Schema.Types.ObjectId],
    comment:coomentSchema,
})
```
finally maked model and export it 
```js
const postCollection = model("post",postSchema)

module.exports = postCollection
```

* **REPORT MODEL**
after I had finished from  make user and post model
I strted to make report model 

schema report model , model and export this model
```js
const { Schema , model } = require("mongoose");

const reportSchema = new Schema({
    title:String,
    reporter:Schema.Types.ObjectId,
    accountID:Schema.Types.ObjectId,
    postID:Schema.Types.ObjectId,
    massage:String,
    status:Schema.Types.Boolean
})

const reportCollection = model("report",reportSchema)
module.exports = reportCollection
```

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

<br/>

## # 3.middlewares
* **valdationFunc**
It is middle ware function take schema of Joi and validate 
first loop with key of request body, params and query
then valid schema with req.key
if there no error will next
if error will message the error

```js
let headerKey = ['body','params','query']

const validationFunc = (schema)=>{
    return (req,res,next)=>{
        let errList = []
        headerKey.forEach( ele=>{
            if(schema[ele] != undefined){
                let valid = schema[ele].validate(req[ele])
                if(valid.error){
                    errList.push(valid.error)
                }
            }
        })
        if (errList.length > 0) {
            res.status(404).json({message:"validation error",errList})
        }else{
            next()
        }
    }
}

module.exports = validationFunc
```
<br/>

* **authntication**
send end point contain role how can access to this route
if there is no token or false token will message erro
if not decode token and find user by id in the token
if user not exist show message error
if not make add object to request called user contain user -password
if role how is sent equl role of user then next
else error not permition

```js
var jwt = require('jsonwebtoken');
const userCollection = require('../DB/models/user');

const authorization = (roleUser)=>{
  try {
    return async(req,res,next)=>{
        let authorithationToken = req.headers["authorization"]
        if(!authorithationToken || !authorithationToken.startswith("Bearer")){
            res.status(404).json({message:"invallid token"})
        }else{
            let token = authorithationToken.slice(7)
            let {id} = jwt.verify(token, process.env.SECRETJWT);
            let user = await userCollection.findById(id).select("-password")
            if(!user){
                res.status(404).json({message:"user is nont exist"})
            }else{
                req.user = user
                if(roleUser.includes(user.role)){
                    next()
                }else{
                    res.status(404).json({message:"you not allow to access"})
                }
            }        
        }
    }
  } catch (error) {
    res.json({message:"server error",error})
  }
}
module.exports = authorization
```
<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

<br/>


## # 4.Controller

### User controllers
* **signUp**
take email ,password and cpassword from request.body 
check by email if user exist 
if user exist error massage user is exist
if not make new instance from userCollection then save it and message data user
```js
const userCollection = require("../../../DB/models/user")

const signUp = async(req,res)=>{
    let {email,password,cpassword}= req.body
    let findUser = await userCollection.findOne({email:email})
    if(findUser){
        res.status(404).json({message:"user exist"})
    }else{
        
            let addUser = new userCollection({email,password})
            let saveUser = await addUser.save()
            res.status(200).json({message:"success add",saveUser})
        
    }
}
module.exports = signUp
```

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

<br/>
