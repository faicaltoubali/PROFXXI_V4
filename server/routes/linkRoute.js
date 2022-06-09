const express = require("express");
const router = express.Router();
const cors = require("cors");
const auth = require("../middleware/auth");

const {
  generateLink,
  getAllLinks,
  updateLink,
  getScansNumber,
  getParticipantsNumber,
  getParticipants,
  checkLink,
  answerScan,
  getTotalParticipantsNumber,
  getTotalScansNumber,
} = require("../controllers/link");

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

router.get("/scansnumber", auth, getScansNumber);
router.get("/participantsnumber", auth, getParticipantsNumber);
router.get("/totalparticipantsnumber", auth, getTotalParticipantsNumber);
router.get("/totalscansnumber", auth, getTotalScansNumber);

router.get("/participants/:unitid", auth, getParticipants);
router.get("/checklink/:scantype/:userid/:unitid/:scantoken", checkLink);
router.post("/generatelink", auth, generateLink);
router.get("/tracklinks", auth, getAllLinks);
router.put("/updatelink", auth, updateLink);
router.post("/answerscan", answerScan);

module.exports = router;
