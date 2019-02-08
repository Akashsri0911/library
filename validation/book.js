const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBookInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.author = !isEmpty(data.author) ? data.author : "";
  data.publisher = !isEmpty(data.publisher) ? data.publisher : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Book name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.author, { min: 2, max: 30 })) {
    errors.author = "Author name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = "Author field is required";
  }

  if (!Validator.isLength(data.publisher, { min: 2, max: 30 })) {
    errors.publisher = "Publisher name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.publisher)) {
    errors.publisher = "Publisher field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
