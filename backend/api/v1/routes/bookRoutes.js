const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');


// Book Routes
router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

// User Routes
router.post('/register', userController.RegisterUser);
router.post('/login', userController.LoginUser);

// Borrow and Return Book Routes
router.post('/:bookId/borrow', authMiddleware, bookController.borrowBook);
router.post('/:bookId/return', authMiddleware, bookController.returnBook);


module.exports = router;
