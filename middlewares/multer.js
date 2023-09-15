const path = require("path")
const multer  = require('multer');

// ***EJECUCION DE MULTER*** //
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const pathImage = path.join( __dirname, "..","public","images","imageUsers")
        cb (null,pathImage)
    },
    filename : (req,file ,cb)=>{
        const fileNewUser =`img-user-`+ Date.now() + path.extname(file.originalname)
        cb(null,fileNewUser)
    }
})
const upload = multer({storage})

module.exports = upload