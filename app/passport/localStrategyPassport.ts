import { UserBusConc } from '../user/userBus';
import { UserDalConc } from '../user/userDal';
import {HashPassword} from '../utility/hashUtility';
import jwt from 'jsonwebtoken';
var LocalStrategy    = require('passport-local').Strategy;
export const LocalPassport = (passport: any, strategy: any) => {
    const userBus=new UserBusConc(new UserDalConc());
    passport.use(
      new LocalStrategy(
        {
          usernameField: 'name',
          passwordField: 'password',
          passReqToCallback: true,
          session: false,
        },
        async (req: Request, email: string, password: string, done: any) => {
          try {
            const user = await userBus.findByName(email)

            if (!user) {
              return done(null, false)
            }
            const hashUtiliy=new HashPassword();
            const passCheck = await hashUtiliy.validateUser(password, user.password);
            if (!passCheck) {
              return done(null, false)
            }
                // Create token
                    const token = jwt.sign(
                        { user_id: user._id, email },
                        "abc",  ///temprory TOKEN_KEY
                        {
                        expiresIn: "2h",
                        }
                    );
                    // save user token
                    user.token = token;


            return done(null, user)
          } catch (error) {
            console.log(error)
          }
        }
      )
    )
  }