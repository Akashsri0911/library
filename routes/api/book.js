const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require('body-parser');

// Load Input Validation

const validateBookInput = require("../../validation/book");

// Load  model

const Book = require("../../models/Book");
const User = require("../../models/User");

//Middleware
router.use(bodyParser.urlencoded({
  extended: false
}));

// @route   GET api/book/test
// @desc    Tests book route
// @access  Public
router.get("/test", (req, res) => res.render({
  msg: "Book Works"
}));



// @route   POST api/book/add
// @desc    Add a new book
// @access  Public
router.post(
  "/add",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateBookInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Book.findOne({
      name: req.body.name,
      author: req.body.author,
      publisher: req.body.publisher
    }).then(book => {
      if (book) {
        errors.book = "Book already exist";
        return res.status(400).json(errors);
      } else {
        const newBook = new Book({
          addedby: req.user.id,
          name: req.body.name,
          author: req.body.author,
          publisher: req.body.publisher
        });

        newBook
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      }
    });
  });

// @route   GET api/book/all
// @desc    show all books
// @access  Public
router.get(
  "/all",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Book.find()
      .then(book => {
        if (!book) {
          errors.nobook = "There are no books";
          return res.status(404).json(errors);
        }

        res.json(book);
      })
      .catch(err => res.status(404).json({
        book: "There are no books"
      }));
  }
);

// @route   GET api/book/
// @desc    Get books by user ID
// @access  Public

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};

    Book.findOne({
        addedby: req.user.id
      })
      .then(book => {
        if (!book) {
          errors.nobook = "There is no book added by this user";
          res.status(404).json(errors);
        }

        res.json(book);
      })
      .catch(err =>
        res.status(404).json({
          book: "There is no book added by this user"
        })
      );
  }
);

// @route   GET api/book/user/:user_id
// @desc    Get book by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Book.find({
      addedby: req.params.user_id
    })
    .then(book => {
      if (!book) {
        errors.nobook = "There is no book for this user";
        res.status(404).json(errors);
      }

      res.json(book);
    })
    .catch(err =>
      res.status(404).json({
        book: "There is no book for this user"
      })
    );
});

module.exports = router;