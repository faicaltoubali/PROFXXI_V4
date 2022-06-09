const express = require("express");
const router = express.Router();
const cors = require("cors");
const auth = require("../middleware/auth");

const {
  pieData,
  barData,
  hbarData,
  gaugeData,
  radarData,
  distBarData,
  lineData,
} = require("../controllers/myUnitsAnalysis");

const {
  gaugeDataUniv,
  radarDataUniv,
  distBarDataUniv,
  pieDataUniv,
} = require("../controllers/UniversityAnalysis");

const {
  getAllUnivs,
  getAllUnits,
  barDataUniv,
  hbarDataUniv,
} = require("../controllers/GlobalAnalysis");

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

router.get("/myunitsanalysis/gauge/:idunit", auth, gaugeData);
router.get("/myunitsanalysis/pie/:idunit", auth, pieData);
router.get("/myunitsanalysis/bar/:idunit", auth, barData);
router.get("/myunitsanalysis/hbar/:idunit", auth, hbarData);
router.get("/myunitsanalysis/radar/:idunit", auth, radarData);
router.get("/myunitsanalysis/distbar/:idunit", auth, distBarData);
router.get("/myunitsanalysis/line/:idunit/:dateIn/:dateOut", auth, lineData);

router.get("/universityanalysis/gauge/:university", auth, gaugeDataUniv);
router.get("/universityanalysis/pie/:university", auth, pieDataUniv);
router.get("/universityanalysis/radar/:university", auth, radarDataUniv);
router.get("/universityanalysis/distbar/:university", auth, distBarDataUniv);

router.get("/globalanalysis", getAllUnivs);
router.get("/globalanalysis/:univ", getAllUnits);
router.get("/globalanalysis/bar/:university", barDataUniv);
router.get("/globalanalysis/hbar/:university", hbarDataUniv);

module.exports = router;
