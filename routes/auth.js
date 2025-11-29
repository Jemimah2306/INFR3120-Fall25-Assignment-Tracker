// routes/auth.js
const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/authMiddleware");

// Login page
router.get("/login", ensureGuest, (req, res) => {
  res.render("auth/login", { title: "Login", error: req.flash("error")});
});

// Register page
router.get("/register", ensureGuest, (req, res) => {
  res.render("auth/register", { title: "Register", error: req.flash("error") });
});


/* ------------------------------------
        GOOGLE AUTHENTICATION
------------------------------------- */
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) return next(err);

    if (user) {
      // Existing user → log in
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect("/"); // home page
      });
    } else if (info && info.profile) {
      // New user → redirect to register page with Google info
      const profile = info.profile;
      req.session.newUser = {
        provider: "google",
        providerId: profile.id,
        displayName: profile.displayName,
        email: profile.emails ? profile.emails[0].value : ""
      };
      return res.redirect("/auth/register");
    } else {
      req.flash("error", "Google authentication failed");
      return res.redirect("/auth/login");
    }
  })(req, res, next);
});

/* ------------------------------------
        GITHUB AUTHENTICATION
------------------------------------- */
router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github/callback", (req, res, next) => {
  passport.authenticate("github", (err, user, info) => {
    if (err) return next(err);

    if (user) {
      // Existing user → log in
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect("/"); // home page
      });
    } else if (info && info.profile) {
      // New user → redirect to register page with GitHub info
      const profile = info.profile;
      req.session.newUser = {
        provider: "github",
        providerId: profile.id,
        displayName: profile.displayName || profile.username,
        email: profile.emails ? profile.emails[0].value : ""
      };
      return res.redirect("/auth/register");
    } else {
      req.flash("error", "GitHub authentication failed");
      return res.redirect("/auth/login");
    }
  })(req, res, next);
});


/* ------------------------------------
        LOGOUT
------------------------------------- */
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/auth/login");
  });
});

module.exports = router;
