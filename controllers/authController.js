// controllers/authController.js
const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('login', { error: req.flash('error') }); // renders login.ejs
};

// Logout user
exports.logout = (req, res) => {
  req.logout(err => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.redirect('/'); // redirect to home page after logout
  });
};

// Called after successful OAuth login
exports.oauthCallback = async (req, res) => {
  // user is already set by passport
  res.redirect('/'); // Home page after login
};
