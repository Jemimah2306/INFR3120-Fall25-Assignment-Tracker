const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        // Look for existing user
        const user = await User.findOne({ providerId: profile.id });
        
        if (user) {
          // Existing user → login
          return done(null, user);
        }

        // New user → pass profile info in "info" for the callback route
        return done(null, false, { profile });

      } catch (err) {
        return done(err, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
