module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/login"); // redirects unauthenticated users to login
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect("/"); // redirect logged-in users to home instead of dashboard
  }
};
