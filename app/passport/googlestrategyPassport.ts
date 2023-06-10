import { UserBusConc } from '../user/userBus';
import { UserDalConc } from '../user/userDal';
import {HashPassword} from '../utility/hashUtility';
import jwt from 'jsonwebtoken';




export const GooglePassport = (passport: any, strategy: any) => {
    const userBus=new UserBusConc(new UserDalConc());
    var GoogleStrategy = require('passport-google-oauth20').Strategy;

    passport.use(new GoogleStrategy({
        clientID: '373444033004-d7e5gd78b0qo175tdl8udndopreir5nn.apps.googleusercontent.com',
        clientSecret: '_xAP-SY_Ra2keuieWTMOYezZ',
        callbackURL: 'http://localhost:8000/auth/google/callback'
      }, function(accessToken, refreshToken, profile, cb) {
    console.log('ok');
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        //  });
    
          console.log(profile);
      }));
  }