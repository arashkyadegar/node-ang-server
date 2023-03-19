module.exports=function(){
    return new Promise((resolve,reject) => {
      ///const logger=require('./winstonConfig');

      const mongoose=require('mongoose');

      mongoose.connect('mongodb://127.0.0.1:27017/blogdb');
      var db = mongoose.connection;

       db.on('error',err =>{
          console.error.bind(console, 'connection error:')
           reject(err);
       });

        db.once('open', function() {
          console.log("connected to mongoDb successfully..!");

          resolve(db);
        })
    });
}
