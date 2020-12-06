"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({ x: 123 });
});
exports.default = router;
//# sourceMappingURL=index.js.map