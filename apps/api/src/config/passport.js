import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../modules/auth/auth.model.js';
import { env } from './env.js';

passport.use(new GoogleStrategy({
  clientID:     env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  callbackURL:  '/api/v1/auth/google/callback',
},
async (_accessToken, _refreshToken, profile, done) => {
  try {
    const email      = profile.emails[0].value;
    const profilePic = profile.photos?.[0]?.value || null;

    // find existing user by googleId or email
    let user = await User.findOne({ $or: [{ googleId: profile.id }, { email }] });

    if (user) {
      // link google to existing email account if not already linked
      if (!user.googleId) {
        user.googleId     = profile.id;
        user.authProvider = 'google';
        if (!user.profilePic) user.profilePic = profilePic;
        await user.save();
      }
      return done(null, user);
    }

    // new user via google
    user = await User.create({
      email,
      username:     email.split('@')[0] + '_' + Date.now(),
      googleId:     profile.id,
      authProvider: 'google',
      profilePic,
      isVerified:   true,   // google already verified the email
    });

    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

export default passport;
