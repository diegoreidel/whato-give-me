import express = require('express');

import { findUser, findUsers, saveUser } from '../services/user-service';

const router: express.Router = express.Router();

router.get('/', function(req, res) {
  findUsers().then(users => {
    res.send(users);
  })
});

router.put('/', function(req, res) {
  saveUser(req.body);
  res.sendStatus(204);
  res.end();
});

router.get('/:email', function(req, res) {
  findUser(req.params.email).then(user => {
    res.send(user);
  })
});

export default router;
