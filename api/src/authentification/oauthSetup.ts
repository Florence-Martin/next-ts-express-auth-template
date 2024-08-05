import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const googleClientID = "your-google-client-id";
const googleClientSecret = "your-google-client-secret";

const linkedInClientID = "your-linkedin-client-id";
const linkedInClientSecret = "your-linkedin-client-secret";

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRepository = getRepository(User);

        // Vérifiez si l'email est disponible
        const email =
          profile.emails && profile.emails[0] && profile.emails[0].value;
        if (!email) {
          return done(new Error("No email found"), undefined);
        }

        let user = await userRepository.findOne({ where: { email } });
        if (!user) {
          user = userRepository.create({
            name: profile.displayName,
            email: email,
            provider: "google",
          });
          await userRepository.save(user);
        }

        done(null, user);
      } catch (error) {
        // Vérification et typage de l'erreur
        if (error instanceof Error) {
          done(error, undefined);
        } else {
          done(new Error("An unknown error occurred"), undefined);
        }
      }
    }
  )
);

passport.use(
  new LinkedInStrategy(
    {
      clientID: linkedInClientID,
      clientSecret: linkedInClientSecret,
      callbackURL: "/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRepository = getRepository(User);

        // Vérifiez si l'email est disponible
        const email =
          profile.emails && profile.emails[0] && profile.emails[0].value;
        if (!email) {
          return done(new Error("No email found"), undefined);
        }

        let user = await userRepository.findOne({ where: { email } });
        if (!user) {
          user = userRepository.create({
            name: profile.displayName,
            email: email,
            provider: "linkedin",
          });
          await userRepository.save(user);
        }

        done(null, user);
      } catch (error) {
        if (error instanceof Error) {
          done(error, undefined);
        } else {
          done(new Error("An unknown error occurred"), undefined);
        }
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
