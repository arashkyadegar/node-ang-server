import express, { query } from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import LocalStrategy from 'passport-local';
import { GooglePassport } from '../passport/googlestrategyPassport';
import { LocalPassport } from '../passport/localStrategyPassport';
import { UserEntity } from '../user/userEntity';
   export const AuthRouter=express.Router();

   LocalPassport(passport, LocalStrategy.Strategy);
   GooglePassport(passport, GoogleStrategy.Strategy);
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////Google Login////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

                // email gets their emails
            AuthRouter.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
                // the callback after google has authenticated the user
            AuthRouter.get('/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////local Login/////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

            AuthRouter.post('/login',passport.authenticate('local',{session: false}),async (req, res) => {
                const user=<UserEntity> req['user'];
                const rememberUser = req.body.remember;
                if(user != undefined)
                   try {
                    if(rememberUser){
                              res.cookie(`user-cookie`,{
                                id:user._id,
                                name:user.name,
                                token:user.token
                              },{
                                maxAge: 5000,
                                // expires works the same as the maxAge
                                //expires: new Date('01 12 2021'),
                                secure: true,
                                httpOnly: true,
                                sameSite: 'lax'
                            });
                          }
                    res.statusCode=200;
                     res.send(user);
                   } catch (error) {
                    res.send({rslt:'not true'});
                   }
                 })


            module.exports=AuthRouter;