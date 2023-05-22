import express from 'express';
const multer = require("multer");
const upload = multer({ dest: './uploads/' })

export const UploadRouter=express.Router();


            UploadRouter.post("/",upload.single('file'),function(req,res){           
                     //console.log(req);
              res.send('ok');
         });
     //           UploadRouter.post('/profile', upload.single('avatar'), function (req, res, next) {
     //                // req.file is the `avatar` file
     //                // req.body will hold the text fields, if there were any
     //           })
module.exports=UploadRouter;