const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

// const userController = require('../controllers/userController');

// router.post('/answers', catchErrors(userController.createAnswers));
module.exports = router;
