const db = require("../database/database");
const crypto = require("crypto");

exports.generateLink = async (req, res) => {
  const unitId = req.body.unitId;
  const scanType = req.body.scanType;

  // Setting up the current date in the format of YYYY-MM-DD
  const date = new Date();
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const fullDate =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  // Setting up the Link
  const linkCrypto = crypto.randomBytes(8).toString("base64");
  const linkKey = linkCrypto.replace("/", "0");
  const link = `http://localhost:3000/scan/${scanType}/${req.userId}/${unitId}/${linkKey}`;

  //////
  db.query(
    "INSERT INTO questionnaires (link, idunit, email, date, idtype, status) VALUES (?,?,?,?,?,?)",
    [link, unitId, req.userEmail, fullDate, scanType, "OPEN"],
    (err, result) => {
      if (result) {
        res.json({
          message:
            "Link generated successfuly, Please copy it and send it to your participants :",
          link: link,
        });
      } else {
        res.json({ message: "There has been an error, please retry later" });
      }
    }
  );
};

exports.getAllLinks = async (req, res) => {
  db.query(
    "SELECT idquestionnaire, link, units.name, date, idtype, status FROM questionnaires JOIN units ON questionnaires.idunit = units.idunit WHERE email = ?",
    [req.userEmail],
    (err, result) => {
      if (result) {
        var i = 0;
        let linksResult = [];
        while (result[i]) {
          const { idquestionnaire, link, name, date, idtype, status } =
            result[i];
          const dateString = JSON.stringify(date);
          const dateView =
            "Date: " +
            dateString.split('"')[1].split("T")[0] +
            " Time: " +
            dateString.split('"')[1].split("T")[1].split(".")[0];

          const linkObject = {
            idquestionnaire: idquestionnaire,
            link: link,
            name: name,
            date: dateView,
            type: idtype,
            status: status,
          };
          linksResult.push(linkObject);
          i = i + 1;
        }
        res.json({ linksResult: linksResult });
      } else {
        console.log(err);
        res.status(404).json({ message: "Error while finding your links" });
      }
    }
  );
};

exports.updateLink = async (req, res) => {
  const idLink = req.body.idLink;
  db.query(
    "SELECT status FROM questionnaires WHERE idquestionnaire = ?",
    [idLink],
    (err, result) => {
      if (result) {
        const statusUpdated = result[0].status === "OPEN" ? "CLOSED" : "OPEN";
        db.query(
          "UPDATE questionnaires SET status = ? WHERE idquestionnaire=?",
          [statusUpdated, idLink],
          (err, result) => {
            if (result) {
              res.json({
                updated: true,
              });
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
};

exports.getScansNumber = async (req, res) => {
  console.log(req.userEmail);
  db.query(
    "SELECT COUNT(*) as num from questionnaires WHERE email = ?",
    [req.userEmail],
    (err, result) => {
      if (result) {
        res.json({ scansNumber: result[0].num });
      }
    }
  );
};

exports.checkLink = async (req, res) => {
  const scantype = req.params.scantype;
  const userid = req.params.userid;
  const unitid = req.params.unitid;
  const scantoken = req.params.scantoken;
  console.log(userid, unitid, scantoken);

  const requestedLink = `http://localhost:3000/scan/${scantype}/${userid}/${unitid}/${scantoken}`;

  db.query(
    "SELECT * FROM questionnaires WHERE link = ?",
    [requestedLink],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          if (result[0].status === "OPEN") {
            res.json({
              error: false,
              authorized: true,
              idquestionnaire: result[0].idquestionnaire,
            });
          } else {
            res.json({ error: false, authorized: false });
          }
        } else {
          res.json({ error: true });
        }
      }
    }
  );
};

exports.answerScan = async (req, res) => {
  const user = req.body.user;
  const userAnswers = req.body.userAnswers;
  const idScan = req.body.idScan;

  // Setting up the current date in the format of YYYY-MM-DD
  const date = new Date();
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const fullDate =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  db.query(
    "INSERT INTO answers (idquestionnaire,date, participantfirstname, participantlastname,participantemail,participantposition, A1, A2, A3 , A4, A5, A6, A7, A8, A9, A10, A11, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, D1, D2, D3, D4, D5, D6, D7, D8, D9, E1, E2, E3, E4, E5, E6, E7, E8) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      idScan,
      fullDate,
      user.firstName,
      user.lastName,
      user.email,
      user.position,
      userAnswers.A1,
      userAnswers.A2,
      userAnswers.A3,
      userAnswers.A4,
      userAnswers.A5,
      userAnswers.A6,
      userAnswers.A7,
      userAnswers.A8,
      userAnswers.A9,
      userAnswers.A10,
      userAnswers.A11,
      userAnswers.B1,
      userAnswers.B2,
      userAnswers.B3,
      userAnswers.B4,
      userAnswers.B5,
      userAnswers.B6,
      userAnswers.B7,
      userAnswers.B8,
      userAnswers.B9,
      userAnswers.B10,
      userAnswers.B11,
      userAnswers.C1,
      userAnswers.C2,
      userAnswers.C3,
      userAnswers.C4,
      userAnswers.C5,
      userAnswers.C6,
      userAnswers.C7,
      userAnswers.C8,
      userAnswers.C9,
      userAnswers.C10,
      userAnswers.C11,
      userAnswers.D1,
      userAnswers.D2,
      userAnswers.D3,
      userAnswers.D4,
      userAnswers.D5,
      userAnswers.D6,
      userAnswers.D7,
      userAnswers.D8,
      userAnswers.D9,
      userAnswers.E1,
      userAnswers.E2,
      userAnswers.E3,
      userAnswers.E4,
      userAnswers.E5,
      userAnswers.E6,
      userAnswers.E7,
      userAnswers.E8,
    ],
    (err, result) => {
      if (result) {
        db.query(
          "SELECT * FROM answers WHERE idanswer = ?",
          [result.insertId],
          (err2, result2) => {
            const selectedAnswer = result2[0];
            if (selectedAnswer.participantposition === "Student") {
              db.query(
                "UPDATE answers SET A = (A1+A2+A3+A4+A5)/5, B = (B1+B2+B3+B4+B5)/5, C=(C1+C2+C3+C4+C5)/5, D=(D1+D2+D3+D4+D5)/5, E=(E1+E2+E3+E4+E5)/5 WHERE idanswer = ?",
                [result.insertId]
              );
              db.query(
                "UPDATE answers SET L1 = (A1+B1+C1+D1+E1)/5, L2 = (A2+B2+C2+D2+E2)/5, L3=(A3+B3+C3+D3+E3)/5, L4=(A4+B4+C4+D4+E4)/5, L5=(A5+B5+C5+D5+E5)/5 WHERE idanswer = ?",
                [result.insertId]
              );
            } else {
              db.query(
                "UPDATE answers SET A = (A1+A2+A3+A4+A5+A6+A7+A8+A9+A10+A11)/11, B = (B1+B2+B3+B4+B5+B6+B7+B8+B9+B10+B11)/11, C=(C1+C2+C3+C4+C5+C6+C7+C8+C9+C10+C11)/11, D=(D1+D2+D3+D4+D5+D6+D7+D8+D9)/9, E=(E1+E2+E3+E4+E5+E6+E7+E8)/8 WHERE idanswer = ?",
                [result.insertId]
              );
              db.query(
                "UPDATE answers SET L1 = (A1+A2+A3+B1+B2+B3+C1+C2+C3+D1+D2+D3+E1+E2)/14, L2 = (A4+A5+A6+B4+B5+C4+C5+D4+D5+E3+E4)/11, L3=(A7+A8+B6+B7+C6+C7+D6+D7+E5+E6)/10, L4=(A9+B8+B9+C8+C9+D8+E7)/7, L5=(A10+A11+B10+B11+C10+C11+D9+E8)/8 WHERE idanswer = ?",
                [result.insertId]
              );
            }
            db.query(
              "UPDATE answers SET Global_Mark=(A+B+C+D+E+L1+L2+L3+L4+L5)/10 WHERE idanswer = ?",
              [result.insertId]
            );
          }
        );

        res.json({ added: true });
      } else {
        console.log(result);
        res.json({ added: false });
      }
    }
  );
};

exports.getParticipantsNumber = async (req, res) => {
  console.log(req.userEmail);
  db.query(
    "SELECT COUNT(*) as num from questionnaires JOIN answers ON questionnaires.idquestionnaire = answers.idquestionnaire WHERE email = ?",
    [req.userEmail],
    (err, result) => {
      if (result) {
        res.json({ participantsNumber: result[0].num });
      }
    }
  );
};

exports.getParticipants = async (req, res) => {
  const unitid = req.params.unitid;
  db.query(
    "SELECT participantfirstname, participantlastname, participantemail, participantposition, answers.date FROM questionnaires JOIN answers ON questionnaires.idquestionnaire = answers.idquestionnaire WHERE idunit = ?",
    [unitid],
    (err, result) => {
      if (result) {
        var i = 0;
        let participantsResult = [];
        while (result[i]) {
          const {
            participantfirstname,
            participantlastname,
            participantemail,
            participantposition,
            date,
          } = result[i];

          const dateString = JSON.stringify(date);
          const dateView =
            "Date: " +
            dateString.split('"')[1].split("T")[0] +
            " Time: " +
            dateString.split('"')[1].split("T")[1].split(".")[0];

          const participant = {
            participantfirstname: participantfirstname,
            participantlastname: participantlastname,
            participantemail: participantemail,
            participantposition: participantposition,
            date: dateView,
          };
          participantsResult.push(participant);
          i = i + 1;
        }

        res.json({ participantsResult: participantsResult });
      } else {
        console.log(err);
      }
    }
  );
};

exports.getTotalParticipantsNumber = async (req, res) => {
  db.query("SELECT COUNT(*) as num FROM answers", (err, result) => {
    if (result) {
      res.json({ totalParticipantsNumber: result[0].num });
    }
  });
};

exports.getTotalScansNumber = async (req, res) => {
  db.query("SELECT COUNT(*) as num FROM questionnaires", (err, result) => {
    if (result) {
      res.json({ totalScansNumber: result[0].num });
    }
  });
};
