var express = require('express');
const router=express.Router();
// is it ok when adding routers with 'require'
//but it gets error when changing it to import
// why??

const HomeRouter=require('../home/home');
const BlogRouter=require('../blog/blog');
const PostRouter=require('../post/post');

module.exports = function(app){
    app.use('/home',HomeRouter);
    app.use('/blogs',BlogRouter);
    app.use('/posts',PostRouter);


    
};
