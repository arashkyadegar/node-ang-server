import express, { query } from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import LocalStrategy from 'passport-local';
import { GooglePassport } from '../passport/googlestrategyPassport';
import { LocalPassport } from '../passport/localStrategyPassport';
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


                console.log(req['user']);
                   try {
                     res.send('logged in')
                   } catch (error) {
                     console.log(error)
                   }
                 })


            module.exports=AuthRouter;