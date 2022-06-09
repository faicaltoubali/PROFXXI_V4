const db = require("../database/database");

exports.createInitiative = async (req, res) => {
  const initiative = req.body.initiative;
  console.log(req.userEmail);

  db.query(
    "INSERT INTO initiatives (name,description,dimA,dimB,dimC,dimD,dimE,technologies,time,access) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      initiative.initiativeName,
      initiative.initiativeDescription,
      initiative.dimA,
      initiative.dimB,
      initiative.dimC,
      initiative.dimD,
      initiative.dimE,
      initiative.initiativeTechnologies,
      initiative.initiativeTime,
      initiative.accessType,
    ],
    (err, result) => {
      if (result) {
        console.log(result);
        let initiativeid = result.insertId;
        db.query(
          "INSERT INTO initiativegeneration (email,idinitiative) VALUES (?,?)",
          [req.userEmail, initiativeid],
          (err, result) => {
            if (result) {
              res.send({ created: true });
            }
          }
        );
      } else {
        res.send({ created: false });
      }
    }
  );
};

exports.updateInitiative = async (req, res) => {
  const idinitiative = req.params.id;
  const initiative = req.body.initiative;
  console.log(req.userEmail);
  db.query(
    "UPDATE initiatives SET name=? ,description=? ,competences=? ,technologies=? ,time=? ,access=? WHERE idinitiative=?",
    [
      initiative.initiativeName,
      initiative.initiativeDescription,
      initiative.initiativeCompetences,
      initiative.initiativeTechnologies,
      initiative.initiativeTime,
      initiative.accessType,
      idinitiative,
    ],
    (err, result) => {
      if (result) {
        res.json({
          updated: true,
          message: "The initiative was successfuly updated",
        });
      } else {
        res.json({
          updated: false,
          message:
            "There has been an error while updating the initiative, please try later",
        });
      }
    }
  );
};

exports.getAllInitiatives = async (req, res) => {
  //console.log(req);
  console.log(req.userEmail);
  db.query(
    "SELECT * FROM initiatives JOIN initiativegeneration ON initiativegeneration.idinitiative = initiatives.idinitiative WHERE initiativegeneration.email = ?",
    [req.userEmail],
    (err, result) => {
      if (result) {
        var i = 0;
        let initiativesResult = [];
        while (result[i]) {
          const {
            idinitiative,
            name,
            description,
            competences,
            technologies,
            time,
            access,
          } = result[i];

          const initiative = {
            idinitiative: idinitiative,
            name: name,
            description: description,
            competences: competences,
            technologies: technologies,
            time: time,
            access: access,
          };
          initiativesResult.push(initiative);
          i = i + 1;
        }

        res.json({ initiativesResult: initiativesResult });
      } else {
        res
          .status(404)
          .json({ message: "Error while finding your user units" });
      }
    }
  );
};

exports.getInitiativesNumber = async (req, res) => {
  console.log(req.userEmail);
  db.query(
    "SELECT COUNT(*) as num from initiativegeneration WHERE email = ?",
    [req.userEmail],
    (err, result) => {
      if (result) {
        res.json({ initiativesNumber: result[0].num });
      }
    }
  );
};

exports.getTotalInitiativesNumber = async (req, res) => {
  db.query(
    "SELECT COUNT(*) as num FROM initiativegeneration",
    (err, result) => {
      if (result) {
        res.json({ totalInitiativesNumber: result[0].num });
      }
    }
  );
};

exports.searchInitiatives = async (req, res) => {
  const univName = req.params.univName;
  const initiative = JSON.parse(req.query?.initiative);
  console.log(initiative);

  console.log(univName);

  if (univName === "All") {
    if (initiative.type) {
      console.log("fetch for all universities without competences");
      db.query("SELECT * FROM initiatives", (err, result) => {
        if (result) {
          console.log(result.length);

          var i = 0;
          let initiativesResult = [];
          while (result[i]) {
            const {
              idinitiative,
              name,
              description,
              dimA,
              dimB,
              dimC,
              dimD,
              dimE,
              technologies,
              time,
              access,
            } = result[i];

            const initiative = {
              idinitiative: idinitiative,
              name: name,
              description: description,
              dimA: dimA,
              dimB: dimB,
              dimC: dimC,
              dimD: dimD,
              dimE: dimE,
              technologies: technologies,
              time: time,
              access: access,
            };
            initiativesResult.push(initiative);
            i = i + 1;
          }

          res.json({ initiativesResult: initiativesResult });
        } else {
          res.status(404).json({
            message: "Error while finding your user universities",
          });
        }
      });
    } else {
      console.log("fetch for all universities with competences");
      db.query(
        "SELECT * FROM initiatives WHERE dimA = ? OR dimB = ? OR dimC = ? OR dimD = ? OR dimE = ?",
        [
          initiative.dimA,
          initiative.dimB,
          initiative.dimC,
          initiative.dimD,
          initiative.dimE,
        ],
        (err, result) => {
          if (result) {
            console.log(result.length);

            var i = 0;
            let initiativesResult = [];
            while (result[i]) {
              const {
                idinitiative,
                name,
                description,
                dimA,
                dimB,
                dimC,
                dimD,
                dimE,
                technologies,
                time,
                access,
              } = result[i];

              const initiative = {
                idinitiative: idinitiative,
                name: name,
                description: description,
                dimA: dimA,
                dimB: dimB,
                dimC: dimC,
                dimD: dimD,
                dimE: dimE,
                technologies: technologies,
                time: time,
                access: access,
              };
              initiativesResult.push(initiative);
              i = i + 1;
            }

            res.json({ initiativesResult: initiativesResult });
          } else {
            res
              .status(404)
              .json({ message: "Error while finding your user universities" });
          }
        }
      );
    }
  } else {
    if (!initiative.type) {
      console.log(`fetch for university: ${univName} without competences`);
      db.query(
        "SELECT * FROM initiatives JOIN initiativegeneration JOIN users ON initiativegeneration.idinitiative = initiatives.idinitiative AND users.email = initiativegeneration.email WHERE organizationName = ?",
        [
          //AND dimA = ? AND dimB = ? AND dimC = ? AND dimD = ? AND dimE = ?
          univName,
        ],
        (err, result) => {
          if (result) {
            console.log(result.length);

            var i = 0;
            let initiativesResult = [];
            while (result[i]) {
              const {
                idinitiative,
                name,
                description,
                dimA,
                dimB,
                dimC,
                dimD,
                dimE,
                technologies,
                time,
                access,
              } = result[i];

              const initiative = {
                idinitiative: idinitiative,
                name: name,
                description: description,
                dimA: dimA,
                dimB: dimB,
                dimC: dimC,
                dimD: dimD,
                dimE: dimE,
                technologies: technologies,
                time: time,
                access: access,
              };
              initiativesResult.push(initiative);
              i = i + 1;
            }

            res.json({ initiativesResult: initiativesResult });
          } else {
            res
              .status(404)
              .json({ message: "Error while finding your user units" });
          }
        }
      );
    } else {
      console.log(`fetch for university: ${univName} with competences`);
      db.query(
        "SELECT * FROM initiatives JOIN initiativegeneration JOIN users ON initiativegeneration.idinitiative = initiatives.idinitiative AND users.email = initiativegeneration.email WHERE (dimA = ? OR dimB = ? OR dimC = ? OR dimD = ? OR dimE = ?) AND organizationName = ?",
        [
          //AND dimA = ? AND dimB = ? AND dimC = ? AND dimD = ? AND dimE = ?
          initiative.dimA,
          initiative.dimB,
          initiative.dimC,
          initiative.dimD,
          initiative.dimE,
          univName,
        ],
        (err, result) => {
          if (result) {
            console.log(result.length);

            var i = 0;
            let initiativesResult = [];
            while (result[i]) {
              const {
                idinitiative,
                name,
                description,
                dimA,
                dimB,
                dimC,
                dimD,
                dimE,
                technologies,
                time,
                access,
              } = result[i];

              const initiative = {
                idinitiative: idinitiative,
                name: name,
                description: description,
                dimA: dimA,
                dimB: dimB,
                dimC: dimC,
                dimD: dimD,
                dimE: dimE,
                technologies: technologies,
                time: time,
                access: access,
              };
              initiativesResult.push(initiative);
              i = i + 1;
            }

            res.json({ initiativesResult: initiativesResult });
          } else {
            res
              .status(404)
              .json({ message: "Error while finding your user units" });
          }
        }
      );
    }
  }
};

exports.searchInitiativesByCountry = async (req, res) => {
  const country = req.query.country;
  console.log(country);

  db.query(
    "SELECT * FROM initiatives JOIN initiativegeneration JOIN users ON users.email = initiativegeneration.email AND initiatives.idinitiative = initiativegeneration.idinitiative WHERE country LIKE ?",
    [country],
    (err, result) => {
      if (result) {
        console.log(result.length);

        var i = 0;
        let initiativesResult = [];
        while (result[i]) {
          const {
            idinitiative,
            name,
            description,
            dimA,
            dimB,
            dimC,
            dimD,
            dimE,
            technologies,
            time,
            access,
          } = result[i];

          const initiative = {
            idinitiative: idinitiative,
            name: name,
            description: description,
            dimA: dimA,
            dimB: dimB,
            dimC: dimC,
            dimD: dimD,
            dimE: dimE,
            technologies: technologies,
            time: time,
            access: access,
          };
          initiativesResult.push(initiative);
          i = i + 1;
        }

        res.json({ initiativesResult: initiativesResult });
      } else {
        res
          .status(404)
          .json({ message: "Error while finding your user units" });
      }
    }
  );
};
