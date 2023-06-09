import { UserBusConc } from '../user/userBus';
import { UserDalConc } from '../user/userDal';
import {HashPassword} from '../utility/hashUtility'
export const LocalPassport = (passport: any, strategy: any) => {
    const userBus=new UserBusConc(new UserDalConc());
    passport.use(
      new strategy(
        {
          usernameField: 'name',
          passwordField: 'password',
          passReqToCallback: true,
          session: false,
        },
        async (req: Request, email: string, password: string, done: any) => {
          try {
            const user = await userBus.findByName(email)
            console.log(user);
            if (!user) {
              return done(null, false)
            }
            const hashUtiliy=new HashPassword();
            const passCheck = await hashUtiliy.validateUser(password, user.password);
            if (!passCheck) {
              return done(null, false)
            }
            return done(null, user)
          } catch (error) {
            console.log(error)
          }
        }
      )
    )
  }