const multer  = require('multer')

function fileFilter (req, file, cb) {
  if(file){
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      cb(null,true)
  }else{
    cb(null,false)
  }
  }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })


  const upload = multer({storage: storage,fileFilter})
  
  
module.exports = upload