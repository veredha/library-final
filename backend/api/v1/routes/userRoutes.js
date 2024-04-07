const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth'); // Update the import

router.get('/', authMiddleware, UserController.GetAllUsers);
router.get('/:id', authMiddleware, UserController.GetUserById);
router.post('/', authMiddleware, UserController.AddUser);
router.put('/:id', authMiddleware, UserController.UpdateUser);
router.delete('/:id', authMiddleware, UserController.DeleteUserById);
router.post('/register', UserController.RegisterUser);
router.post('/login', UserController.LoginUser);

module.exports = router;
