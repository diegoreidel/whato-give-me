import express = require('express');
const router: express.Router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
