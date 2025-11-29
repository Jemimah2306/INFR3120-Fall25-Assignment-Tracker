const GoogleStrategy = require("passport-google-oauth20").Strategy; 
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          const user = await User.findOne({ providerId: profile.id });

          if (user) {
            // Existing user → allow login
            return done(null, user);
          }

          // New user → pass profile info without creating account
          return done(null, false, { profile }); // profile will be available in callback
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
