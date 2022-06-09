const db = require("../database/database");

exports.gaugeDataUniv = async (req, res) => {
  const university = req.params.university;
  db.query(
    "SELECT AVG(Global_Mark) AS AVG_G FROM answers a JOIN questionnaires q JOIN users u ON u.email = q.email AND a.idquestionnaire = q.idquestionnaire WHERE u.organizationName = ? ",
    [university],
    (err, result) => {
      if (result) {
        res.json({ gaugeData: result[0].AVG_G });
      }
    }
  );
};

exports.radarDataUniv = async (req, res) => {
  const university = req.params.university;
  const data = {
    AVG_A: "0",
    AVG_B: "0",
    AVG_C: "0",
    AVG_D: "0",
    AVG_E: "0",
    AVG_L1: "0",
    AVG_L2: "0",
    AVG_L3: "0",
    AVG_L4: "0",
    AVG_L5: "0",
    AVG_G: "0",
  };
  db.query(
    "SELECT AVG(A) as AVG_A, AVG(B) as AVG_B, AVG(C) as AVG_C, AVG(D) as AVG_D, AVG(E) as AVG_E, AVG(L1) as AVG_L1, AVG(L2) as AVG_L2, AVG(L3) as AVG_L3, AVG(L4) as AVG_L4, AVG(L5) as AVG_L5, AVG(Global_Mark) as AVG_G FROM answers a JOIN questionnaires q JOIN users u ON u.email = q.email AND a.idquestionnaire = q.idquestionnaire WHERE u.organizationName = ? ",
    [university],
    (err, result) => {
      if (result) {
        data.AVG_A = result[0].AVG_A;
        data.AVG_B = result[0].AVG_B;
        data.AVG_C = result[0].AVG_C;
        data.AVG_D = result[0].AVG_D;
        data.AVG_E = result[0].AVG_E;
        data.AVG_L1 = result[0].AVG_L1;
        data.AVG_L2 = result[0].AVG_L2;
        data.AVG_L3 = result[0].AVG_L3;
        data.AVG_L4 = result[0].AVG_L4;
        data.AVG_L5 = result[0].AVG_L5;
        data.AVG_G = result[0].AVG_G;
      }
      res.json({ radarData: data });
    }
  );
};

exports.distBarDataUniv = async (req, res) => {
  const university = req.params.university;
  const data = {
    Teacher: 0,
    Administrator: 0,
    Manager: 0,
  };

  db.query(
    "SELECT AVG(Global_Mark) as AVG_G, a.participantposition FROM answers a JOIN questionnaires q JOIN users u ON u.email = q.email AND a.idquestionnaire = q.idquestionnaire WHERE u.organizationName = ? GROUP BY a.participantposition",
    [university],
    (err, result) => {
      let i = 0;
      while (result[i]) {
        data[result[i].participantposition] = result[i].AVG_G;
        i = i + 1;
      }

      // for (let i = 0; i < 3; i++) {}
      res.json({ distBarData: data });
    }
  );
};

exports.pieDataUniv = async (req, res) => {
  const university = req.params.university;
  const data = {
    Teacher: 0,
    Administrator: 0,
    Manager: 0,
  };

  db.query(
    "SELECT a.participantposition, COUNT(a.participantposition) as num FROM answers a JOIN questionnaires q JOIN users u ON u.email = q.email AND a.idquestionnaire = q.idquestionnaire WHERE u.organizationName = ?  GROUP BY a.participantposition",
    [university],
    (err, result) => {
      if (result) {
        let i = 0;
        while (result[i]) {
          data[result[i].participantposition] = result[i].num;
          i = i + 1;
        }
        // for (let i = 0; i < 3; i++) {
        //}
        res.json({ pieData: data });
      }
    }
  );
};
