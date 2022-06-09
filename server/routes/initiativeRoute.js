const express = require("express");
const router = express.Router();
const cors = require("cors");
const auth = require("../middleware/auth");

const {
  createInitiative,
  updateInitiative,
  getAllInitiatives,
  getInitiativesNumber,
  getTotalInitiativesNumber,
  searchInitiatives,
  searchInitiativesByCountry,
} = require("../controllers/initiative");

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

router.get("/initiativesnumber", auth, getInitiativesNumber);
router.get("/totalinitiativesnumber", auth, getTotalInitiativesNumber);

router.post("/createinitiative", auth, createInitiative);
router.get("/manageinitiative", auth, getAllInitiatives);
//router.delete("/manageinitiative/delete/:id", auth, deleteinitiative);

router.put("/manageinitiative/update/:id", auth, updateInitiative);

router.get("/searchinitiatives/:univName", searchInitiatives);

router.get("/searchinitiativesc/country", searchInitiativesByCountry);

module.exports = router;
