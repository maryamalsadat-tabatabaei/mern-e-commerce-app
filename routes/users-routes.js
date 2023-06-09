const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersController.getUsers);
// router.post(
//   "/signup",
//   fileUpload.single("image"),
//   [
//     check("name").not().isEmpty(),
//     check("email").normalizeEmail().isEmail(),
//     check("password").isLength({ min: 6 }),
//   ],
//   usersController.signup
// );
// router.post("/login", usersController.login);
router.post("/resetPassword", usersController.resetPassword);
router.get("/resetPassword/:token", usersController.getNewPassword);
router.post("/new-password", usersController.postNewPassword);
// router.get("/logout", usersController.logout);

module.exports = router;
