import bcrypt from 'bcryptjs';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';

import { findUser, findUserIncludingPassword } from './services/user-service';
import config from './config';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, cb) {
    findUserIncludingPassword(email).then(user => {
        if (!user) return cb(null, false, { message: 'Incorrect email or password.' });
        bcrypt.compare(password, user.password).then(pass => {
            if (!pass) return cb(null, false, { message: 'Incorrect email or password.' });
            return cb(null, user, { message: 'Logged In Successfully' });
        });
    }).catch(err => cb(err));
}));

passport.use(new passportJWT.Strategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
}, (jwtPayload, cb) => {
    return findUser(jwtPayload.email)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        }
    );
}));

export default passport;