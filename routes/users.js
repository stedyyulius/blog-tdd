var express = require('express');
var router = express.Router();
const UserController = require('../Controllers/user-controller.js')
/* GET users listing. */
router.get('/',UserController.listUsers)
router.get('/:id',UserController.getUser)
router.put('/:id',UserController.updateUser)
router.delete('/:id',UserController.deleteUser)
router.post('/signup',UserController.signup)
router.post('/login',UserController.login)


module.exports = router;
