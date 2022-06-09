const db = require("../database/database");

exports.getAllUnivs = async (req, res) => {
  db.query("SELECT DISTINCT organizationName FROM users", (err, result) => {
    if (result) {
      res.json({ univsResult: result });
    }
  });
};

exports.getAllUnits = async (req, res) => {
  const univ = req.params.univ;
  db.query(
    "SELECT units.idunit, units.name, units.type, units.description, units.access, unitgeneration.email, users.organizationName FROM units JOIN unitgeneration JOIN users ON unitgeneration.idunit = units.idunit AND users.email = unitgeneration.email WHERE organizationName = ? AND units.access LIKE 'Public'",
    [univ],
    (err, result) => {
      res.json({ unitsResult: result });
    }
  );
};

exports.barDataUniv = async (req, res) => {
  const university = req.params.university;
  const data = {
    Teacher: {
      AVG_A: "0",
      AVG_B: "0",
      AVG_C: "0",
      AVG_D: "0",
      AVG_E: "0",
    },
    Administrator: {
      AVG_A: "0",
      AVG_B: "0",
      AVG_C: "0",
      AVG_D: "0",
      AVG_E: "0",
    },
    Manager: { AVG_A: "0", AVG_B: "0", AVG_C: "0", AVG_D: "0", AVG_E: "0" },
  };
  db.query(
    "Select AVG(A) as AVG_A, AVG(B) as AVG_B, AVG(C) as AVG_C, AVG(D) as AVG_D, AVG(E) as AVG_E, a.participantposition FROM answers a JOIN questionnaires q JOIN users u ON u.email = q.email AND a.idquestionnaire = q.idquestionnaire WHERE u.organizationName = ? GROUP BY a.participantposition",
    [university],
    (err, result) => {
      if (result) {
        let i = 0;
        while (result[i]) {
          data[result[i].participantposition] = {
            AVG_A: result[i].AVG_A,
            AVG_B: result[i].AVG_B,
            AVG_C: result[i].AVG_C,
            AVG_D: result[i].AVG_D,
            AVG_E: result[i].AVG_E,
          };
          i = i + 1;
        }

        //for (let i = 0; i < 3; i++) {

        //}
        res.json({ barData: data });
      } else {
        console.log(err);
      }
    }
  );
};

exports.hbarDataUniv = async (req, res) => {
  const university = req.params.university;
  const data = {
    Teacher: {
      AVG_L1: "0",
      AVG_L2: "0",
      AVG_L3: "0",
      AVG_L4: "0",
      AVG_L5: "0",
    },
    Administrator: {
      AVG_L1: "0",
      AVG_L2: "0",
      AVG_L3: "0",
      AVG_L4: "0",
      AVG_L5: "0",
    },
    Manager: {
      AVG_L1: "0",
      AVG_L2: "0",
      AVG_L3: "0",
      AVG_L4: "0",
      AVG_L4: "0",
    },
  };

  db.query(
    "SELECT AVG(L1) as AVG_L1, AVG(L2) as AVG_L2, AVG(L3) as AVG_L3, AVG(L4) as AVG_L4, AVG(L5) as AVG_L5, a.participantposition FROM answers a JOIN questionnaires q JOIN users u ON u.email = q.email AND a.idquestionnaire = q.idquestionnaire WHERE u.organizationName = ? GROUP BY a.participantposition",
    [university],
    (err, result) => {
      if (result) {
        let i = 0;
        while (result[i]) {
          data[result[i].participantposition] = {
            AVG_L1: result[i].AVG_L1,
            AVG_L2: result[i].AVG_L2,
            AVG_L3: result[i].AVG_L3,
            AVG_L4: result[i].AVG_L4,
            AVG_L5: result[i].AVG_L5,
          };
          i = i + 1;
        }

        //for (let i = 0; i < 3; i++) {}
        res.json({ hbarData: data });
      }
    }
  );
};
