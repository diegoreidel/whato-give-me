import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';

import corsOptions from '../cors-options';
import { findUser, saveUser } from '../services/user-service';
import config from '../config';

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
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.token_expiration
        });
        return res.status(200).send({ auth: true, token });
    })
    .catch(err => {
        return res.status(500).send(err);
    });
});

router.post('/login', cors(corsOptions), (req, res) => {

    if (!req.body.email || !req.body.password) return handle401(res);

    findUser(req.body.email).then(user => {

        if (!user) return handle401(res);

        bcrypt.compare(req.body.password, user.password).then(password => {

            if (!password) return handle401(res);

            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: config.token_expiration
            });

            res.status(200).send({ auth: true, token });
        });
    }).catch(err => {
        return res.status(500).send('Error on the server.');
    });
});

function handle401(res: any): any {
    return res.status(401).send({ auth: false, token: null });
}

export default router;