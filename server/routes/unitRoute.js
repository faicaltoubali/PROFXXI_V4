const express = require("express");
const router = express.Router();
const cors = require("cors");
const auth = require("../middleware/auth");

const {
  createUnit,
  deleteUnit,
  updateUnit,
  getAllUnits,
  getUnitsNumber,
  getTotalUnitsNumber,
} = require("../controllers/unit");

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

router.get("/unitsnumber", auth, getUnitsNumber);
router.get("/totalunitsnumber", auth, getTotalUnitsNumber);

router.post("/createunit", auth, createUnit);
router.get("/manageunit", auth, getAllUnits);
router.delete("/manageunit/delete/:id", auth, deleteUnit);
router.put("/manageunit/update/:id", auth, updateUnit);

module.exports = router;
