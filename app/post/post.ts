import express from 'express';
import validator from 'validator';
import { PostDalConc } from './postDal';
import { PostEntity, PostEntitySchema } from './postEntity';
import { takeWhile, Observable, of, map, fromEvent, take, from } from 'rxjs';
import { PostBusConc } from './postBus';

export const PostRouter=express.Router();
            const postBus=new PostBusConc(new PostDalConc());


            PostRouter.post("/",async function(req,res,next){
                let rslt; //result
                const  postEntity = req.body as PostEntity;
                ////
                const array$=from(postEntity.documents);

                array$.pipe(
                    map( (value:any) =>validator.escape(value.toString()))
                ).subscribe(     
                    console.log
                )


                // const { error } = PostEntitySchema.validate(postEntity);
                //     if(error){
                //         rslt =`validation failed. errors: ${error}` ;
                //         res.statusCode=400;
                //         res.send(rslt);
                //     }else{
                //         try{
                //             rslt =await postBus.insertOne(postEntity);
                //             res.statusCode=200;
                             res.send(rslt);
                //         }catch(e){
                //             next(e);
                //         }
                //     }
            });



            PostRouter.get("/",async function(req,res,next){
                let rslt:any;
                let pageNo:string="0";
                let title:string="";
                const rowCounts=2;
                     if(req.query.page === undefined)
                            pageNo="0";
                        else
                        pageNo=req.query.page.toString();
                      
                    if(req.query.title === undefined)
                            title="";
                        else
                            title=req.query.title.toString(); 
                    try{
             
                        rslt=await postBus.find(parseInt(pageNo),title);
                 
                    }catch(e){
                            next(e);
                    }        
                    res.statusCode=200;
                    res.send(rslt);
            });




            PostRouter.get("/:id",async function(req,res){ //post-id
                        let rslt=new PostEntity();
                        if(validator.isMongoId(req.params.id.toString())){
                            let tmp_id=req.params.id;
                            rslt =await postBus.findOne(tmp_id);
                        }
                        res.statusCode=200;
                        res.send(rslt);
            });


            PostRouter.put("/:id",async function(req,res,next){
                let rslt; 
                const  postEntity = req.body as PostEntity;
                if(validator.isMongoId(req.params.id.toString())){
                    let tmp_id=req.params.id;
                const { error } = PostEntitySchema.validate(postEntity);
                    if(error){
                        rslt =`validation failed. errors: ${error}` ;
                        res.statusCode=400;
                        res.send(rslt);
                    }else{
                        try{
                            rslt =await postBus.updateOne(tmp_id,postEntity);
                            res.statusCode=200;
                            res.send(rslt);
                        }catch(e){
                            next(e);
                        }
                    }
                }
            });

            PostRouter.delete("/:id",async function(req,res){
                if(validator.isMongoId(req.params.id.toString())){
                    let tmp_id=req.params.id;
                    postBus.deleteOne(tmp_id);
                }
                res.statusCode=200;
                res.send('ok');

            });
    
                    
        module.exports=PostRouter;
