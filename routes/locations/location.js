let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let bodyParser = require("body-parser");
let baseDbUrl = require("../../utils/constants");


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());



let url = baseDbUrl;








module.exports = router;
