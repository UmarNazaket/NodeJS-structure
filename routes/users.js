var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const userController = require('../controllers/userController');
const authenticateToken = require('../util/middleware/authMiddleware')


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(bcrypt.hashSync('12345678', 10))
  res.send('respond with a resource');
});

router.post('/login', authenticateToken, userController.loginUser)
router.post('/register', userController.registerUser)
router.post('/getemail', userController.getEmail)
router.post('/getsentiments', userController.getSentiments)

module.exports = router;
