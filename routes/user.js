const { Router } = require('express');
const router = Router();

'use strict'

var express = require('express');
var ArticleController = require('../controllers/user');

router.post('/signup', ArticleController.signup);
router.post('/signin', ArticleController.signin);

module.exports = router;