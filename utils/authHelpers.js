// backend/utils/authHelpers.js
const validator = require('validator');

const validateEmail = (email) => validator.isEmail(email);
const validatePassword = (password) => password.length >= 6;

module.exports = {
  validateEmail,
  validatePassword,
};