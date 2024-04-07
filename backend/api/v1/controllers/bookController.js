const Book = require('../models/book');

const bookController = {
    getAllBooks: (req, res) => {
        Book.find()
            .then(books => {
                res.status(200).json(books);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    },

    createBook: (req, res) => {
        const { title, author, genre, copies, category } = req.body;
        const book = new Book({
            title,
            author,
            genre,
            copies: parseInt(copies),
            category,
            imagePath
        });

        book.save().then((newBook) => {
            res.status(201).json(newBook);
        }).catch((err) => {
            res.status(400).json({ message: err.message });
        });
    },

    getBookById: (req, res) => {
        let bookId = req.params.id;
        Book.findById(bookId).then((data) => {
            return res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json({ message: err.message });
        });
    },

    addBook: (req, res) => {
        let body = req.body;
        const book = new Book(body);
        book.save().then((data) => {
            return res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json({ message: err.message });
        });
    },
    deleteBook: (req, res) => {
        const { id } = req.params;
    
        Book.findByIdAndDelete(id)
            .then(deletedBook => {
                if (!deletedBook) {
                    throw new Error('Book not found');
                }
                res.status(200).json({ message: 'Book deleted successfully' });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    },
    
    updateBook: (req, res) => {
        const { id } = req.params;
        const { title, author, genre, copies, category } = req.body;
    
        Book.findByIdAndUpdate(id, { title, author, genre, copies, category }, { new: true })
            .then(updatedBook => {
                if (!updatedBook) {
                    throw new Error('Book not found');
                }
                res.status(200).json(updatedBook);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    },
    
    borrowBook: (req, res) => {
        const { bookId } = req.params;
        const userId = req.user.id; 
        Book.findById(bookId)
            .then(book => {
                if (!book) {
                    throw new Error('Book not found');
                }
                if (!book.available) {
                    throw new Error('Book is not available for borrowing');
                }
                book.available = false;
                book.borrowedBy = userId;
                return book.save();
            })
            .then(() => {
                res.status(200).json({ message: 'Book borrowed successfully' });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    },
    
    returnBook: (req, res) => {
        const { bookId } = req.params;
        const userId = req.session.user.userId; // Assuming user is authenticated
        if (!userId) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        Book.findById(bookId)
            .then(book => {
                if (!book) {
                    throw new Error('Book not found');
                }
                if (book.available || book.borrowedBy !== userId) {
                    throw new Error('Cannot return this book');
                }
                book.available = true;
                book.borrowedBy = null;
                return book.save();
            })
            .then(() => {
                res.status(200).json({ message: 'Book returned successfully' });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    },

    createCategory: (category) => {
        return Book.findOne({ category })
            .then(existingBook => {
                if (existingBook) {
                    throw new Error('Category already exists');
                }
                return { message: 'Category created successfully' };
            })
            .catch(err => {
                throw new Error(err.message);
            });
    } 
};

module.exports = bookController;
