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
        // 1️⃣ Check if user already exists by GitHub providerId
        let user = await User.findOne({ providerId: profile.id });
        if (user) return done(null, user);

        // 2️⃣ Check if user exists by email (to avoid duplicate key error)
        const email = profile.emails?.[0]?.value || null;
        if (email) {
          user = await User.findOne({ email });
          if (user) {
            // Link GitHub to existing user
            user.provider = 'github';
            user.providerId = profile.id;
            await user.save();
            return done(null, user);
          }
        }

        // 3️⃣ If no existing user, create new one
        user = new User({
          provider: 'github',
          providerId: profile.id,
          username: profile.username,
          email: email || '',
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
