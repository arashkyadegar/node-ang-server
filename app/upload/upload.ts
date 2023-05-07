import express from 'express';
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });

export const UploadRouter=express.Router();
            UploadRouter.post("/",upload.single('upload_file'),function(req,res){           

                res.json({ message: "Successfully uploaded files" });
         });
module.exports=UploadRouter;