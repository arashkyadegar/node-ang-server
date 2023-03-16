var express = require('express');
const router=express.Router();
// is it ok when adding routers with 'require'
//but it gets error when changing it to import
// why??

const Home=require('./home');
const Blog=require('./blog/blogRouter');
const Post=require('./post');

module.exports = function(app){
    app.use('/home',Home);
    app.use('/blogs',Blog);
    app.use('/posts',Post);
};
