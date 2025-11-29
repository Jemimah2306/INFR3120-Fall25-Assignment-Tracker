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
        let user = await User.findOne({ providerId: profile.id });
        
        if (user) {
          // Existing user → login
          return done(null, user);
        }

        // New user → create in DB
        user = new User({
          provider: 'github',
          providerId: profile.id,
          username: profile.username,
          email: profile.emails?.[0]?.value || '', // GitHub may not always provide email
          avatar: profile.photos?.[0]?.value || ''
        });

        await user.save();

        return done(null, user);

      } catch (err) {
        return done(err, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
