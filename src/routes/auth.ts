import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';


import corsOptions from '../cors-options';
import { saveUser } from '../services/user-service';
import config from '../config';
import passport from '../passport';

const router = express.Router();

router.put('/register', cors(corsOptions), (req, res) => {
    bcrypt.hash(req.body.password, 12).then(passHash => {
        const userData: User = {
            email: req.body.email,
            name: req.body.name,
            password: passHash
        };
        return saveUser(userData);
    })
    .then(user => {
        const token = jwt.sign({ email: user.email }, config.secret, {
            expiresIn: config.token_expiration
        });
        return res.status(200).send({ auth: true, token });
    })
    .catch(err => {
        return res.status(500).send(err);
    });
});

router.post('/login', cors(corsOptions), (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return handle401(res);
        }

       req.login(user, {session: false}, (error) => {
           if (error) {
               res.send(error);
           }
           const token = jwt.sign({ email: user.email }, config.secret, { expiresIn: config.token_expiration });
           return res.json({user, token});
        });
    })(req, res);
});

function handle401(res: any): any {
    return res.status(401).send({ auth: false, token: null });
}

export default router;