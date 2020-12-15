import express = require('express');

import { findUser, findUsers, saveDesire, saveUser } from '../services/user-service';

const router: express.Router = express.Router();

router.get('/', function(req, res) {
  findUsers().then(users => {
    res.send(users);
  })
});

router.put('/', function(req, res) {
  saveUser(req.body).then(user => {
    res.send(user);
  });
});

router.get('/:email', function(req, res) {
  findUser(req.params.email).then(user => {
    if(user) {
      res.send(user);
    } else {
      res.sendStatus(404);
      res.end();
    }
  })
});

router.put('/:email/desires', function(req, res) {
  saveDesire(req.params.email, req.body).then(user => {
    res.send(user);
  })
});

export default router;
