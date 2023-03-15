

var express = require('express');
const router=express.Router();
const Home=require('./home');
const Blog=require('./blog');
const Post=require('./post');

module.exports = function(app){
    app.use('/home',Home);
    app.use('/blogs',Blog);
    app.use('/posts',Post);
};
