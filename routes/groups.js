var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(loadGroups());
});

router.get('/:id', function(req, res, next) {
    res.send({name: req.params.id});
  });

function loadGroups() {
    return [{name: '1'}, {name: '2'}]
} 

module.exports = router;
