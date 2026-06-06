import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import { env } from "./env.js";

// Only initialize Google OAuth if credentials are provided
if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const profilePic = profile.photos?.[0]?.value || null;

          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email }],
          });

          if (user) {
            if (!user.googleId) {
              user.googleId = profile.id;
              user.authProvider = "google";
              if (!user.profilePic) user.profilePic = profilePic;
              await user.save();
            }
            return done(null, user);
          }

          user = await User.create({
            email,
            username: email.split("@")[0] + "_" + Date.now(),
            googleId: profile.id,
            authProvider: "google",
            profilePic,
            isVerified: true,
          });

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      },
    ),
  );
} else {
  console.log("[auth-service] Google OAuth disabled — no credentials provided");
}

export default passport;
