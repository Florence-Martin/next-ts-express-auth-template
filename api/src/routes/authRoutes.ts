import express from "express";
import passport from "passport";
import { register, login } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

export default router;
