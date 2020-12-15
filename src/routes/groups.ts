import express from 'express';
import cors from 'cors';

import { saveGroup, findGroups, findGroup, deleteGroup, addUser } from '../services/group-service';
import corsOptions from '../cors-options';

const router = express.Router();

router.get('/', cors(corsOptions), function(req, res) {
  findGroups().then(groups => {
    res.send(groups);
  })
});

router.put('/', cors(corsOptions), function(req, res) {
  saveGroup(req.body);
  res.sendStatus(204);
  res.end();
});

router.get('/:id', cors(corsOptions), function(req, res) {
  findGroup(req.params.id).then(group => {
    res.send(group);
  })
});

router.delete('/:id', cors(corsOptions), function(req, res) {
  deleteGroup(req.params.id);
  res.sendStatus(204);
  res.end();
});

router.put('/:id/users', cors(corsOptions), function(req, res) {
  addUser(req.params.id, req.body).then(group => {
    res.send(group);
  })
});

export default router;
