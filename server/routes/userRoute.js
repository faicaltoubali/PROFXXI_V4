const express = require("express");
const router = express.Router();
const cors = require("cors");
const auth = require("../middleware/auth");

const {
  register,
  login,
  forgotPassword,
  update,
  deleteProfile,
  deleteData,
  resetPassword,
  getTotalUniversitiesNumber,
  resetForgotPassword,
  contact,
} = require("../controllers/user");

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);

router.put("/update", auth, update);
router.put("/resetpassword/:resetToken", resetForgotPassword);
router.put("/resetpassword", auth, resetPassword);

router.delete("/deleteprofile", auth, deleteProfile);
router.delete("/deletedata", auth, deleteData);

router.get("/totaluniversitiesnumber", auth, getTotalUniversitiesNumber);

router.post("/contact", contact);

module.exports = router;
