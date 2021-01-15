const express = require("express");
const {
  test,
  registerUser,
  deleteUser,
  login,
  logout,
  getUser,
  clearBearer,
} = require("../controllers/test");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router.route("/clear").post(clearBearer);

router
  .route("/")
  .post(registerUser)
  .delete(protect, deleteUser)
  .get(protect, getUser);
router.route("/login").post(login);
router.route("/logout").get(protect, logout);

module.exports = router;
