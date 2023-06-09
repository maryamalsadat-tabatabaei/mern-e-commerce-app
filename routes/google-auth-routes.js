const express = require("express");
const passport = require("passport");

const router = express.Router();
router.get(
  "/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/callback",
  passport.authenticate("google", {
    // successRedirect: process.env.CLIENT_URL,
    session: false,
    successRedirect: "/auth/google/callback/success",
    failureRedirect: "/auth/google/callback/failure",
  })
);
// Success
router.get("/callback/success", (req, res) => {
  console.log("succeed");
  //tiken?
  if (!req.user) res.redirect("/auth/callback/failure");
  res.redirect("/api/users");
});
// failure
router.get("/callback/failure", (req, res) => {
  console.log("Log in failure");

  res.redirect("/api/users/login");
  //   res.status(401).json({
  //     error: true,
  //     message: "Log in failure",
  //   });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/api/users/login");
});

module.exports = router;
