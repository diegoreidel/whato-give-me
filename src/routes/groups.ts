import express = require('express');

import { saveGroup, findGroups, findGroup, deleteGroup, addUser } from '../services/group-service';

const router = express.Router();

router.get('/', function(req, res) {
  findGroups().then(groups => {
    res.send(groups);
  })
});

router.put('/', function(req, res) {
  saveGroup(req.body);
  res.sendStatus(204);
  res.end();
});

router.get('/:id', function(req, res) {
  findGroup(req.params.id).then(group => {
    res.send(group);
  })
});

router.delete('/:id', function(req, res) {
  deleteGroup(req.params.id);
  res.sendStatus(204);
  res.end();
});

router.put('/:id/users', function(req, res) {
  addUser(req.params.id, req.body).then(group => {
    res.send(group);
  })
});

export default router;
