const db = require("../database/database");

exports.pieData = async (req, res) => {
  const idunit = req.params.idunit;
  const data = {
    Teacher: 0,
    Administrator: 0,
    Manager: 0,
  };

  db.query(
    "SELECT answers.participantposition, COUNT(answers.participantposition) as num FROM answers JOIN questionnaires JOIN units ON units.idunit = questionnaires.idunit AND answers.idquestionnaire = questionnaires.idquestionnaire WHERE units.idunit = ? GROUP BY answers.participantposition",
    [idunit],
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

exports.barData = async (req, res) => {
  const idunit = req.params.idunit;
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
    Student: { AVG_A: "0", AVG_B: "0", AVG_C: "0", AVG_D: "0", AVG_E: "0" },
  };

  db.query(
    "Select AVG(A) as AVG_A, AVG(B) as AVG_B, AVG(C) as AVG_C, AVG(D) as AVG_D, AVG(E) as AVG_E, a.participantposition FROM units u JOIN questionnaires q JOIN answers a ON u.idunit = q.idunit AND q.idquestionnaire = a.idquestionnaire WHERE u.idunit = ? GROUP BY a.participantposition",
    [idunit],
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

exports.hbarData = async (req, res) => {
  const idunit = req.params.idunit;
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
    Student: {
      AVG_L1: "0",
      AVG_L2: "0",
      AVG_L3: "0",
      AVG_L4: "0",
      AVG_L4: "0",
    },
  };

  db.query(
    "SELECT AVG(L1) as AVG_L1, AVG(L2) as AVG_L2, AVG(L3) as AVG_L3, AVG(L4) as AVG_L4, AVG(L5) as AVG_L5, a.participantposition FROM units u JOIN questionnaires q JOIN answers a ON u.idunit = q.idunit AND q.idquestionnaire = a.idquestionnaire WHERE u.idunit = ? GROUP BY a.participantposition",
    [idunit],
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

exports.gaugeData = async (req, res) => {
  const idunit = req.params.idunit;
  db.query(
    "SELECT AVG(Global_Mark) AS AVG_G FROM answers a JOIN questionnaires q JOIN units u ON u.idunit= q.idunit AND a.idquestionnaire = q.idquestionnaire WHERE u.idunit = ? ",
    [idunit],
    (err, result) => {
      if (result) {
        res.json({ gaugeData: result[0].AVG_G });
      }
    }
  );
};

exports.radarData = async (req, res) => {
  const idunit = req.params.idunit;
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
    "SELECT AVG(A) as AVG_A, AVG(B) as AVG_B, AVG(C) as AVG_C, AVG(D) as AVG_D, AVG(E) as AVG_E, AVG(L1) as AVG_L1, AVG(L2) as AVG_L2, AVG(L3) as AVG_L3, AVG(L4) as AVG_L4, AVG(L5) as AVG_L5, AVG(Global_Mark) as AVG_G FROM units u JOIN questionnaires q JOIN answers a ON u.idunit = q.idunit AND q.idquestionnaire = a.idquestionnaire WHERE u.idunit = ? ",
    [idunit],
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

exports.distBarData = async (req, res) => {
  const idunit = req.params.idunit;
  const data = {
    Teacher: 0,
    Administrator: 0,
    Manager: 0,
  };

  db.query(
    "SELECT AVG(Global_Mark) as AVG_G, a.participantposition FROM units u JOIN questionnaires q JOIN answers a ON u.idunit = q.idunit AND q.idquestionnaire = a.idquestionnaire WHERE u.idunit = ? GROUP BY a.participantposition",
    [idunit],
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

exports.lineData = async (req, res) => {
  const idunit = req.params.idunit;
  const dateIn = req.params.dateIn + " " + "00:00:00";
  const dateOut = req.params.dateOut + " " + "23:59:59";

  const data = {
    Dates: [],
    AVG_G: [],
    AVG_A: [],
    AVG_B: [],
    AVG_C: [],
    AVG_D: [],
    AVG_E: [],
    AVG_L1: [],
    AVG_L2: [],
    AVG_L3: [],
    AVG_L4: [],
    AVG_L5: [],
  };

  db.query(
    "SELECT q.date as Dates, AVG(Global_Mark) as AVG_G,AVG(A) as AVG_A, AVG(B) as AVG_B, AVG(C) as AVG_C, AVG(D) as AVG_D, AVG(E) as AVG_E, AVG(L1) as AVG_L1, AVG(L2) as AVG_L2, AVG(L3) as AVG_L3, AVG(L4) as AVG_L4, AVG(L5) as AVG_L5 FROM units u JOIN questionnaires q JOIN answers a ON u.idunit = q.idunit AND q.idquestionnaire = a.idquestionnaire WHERE u.idunit = ? AND q.date BETWEEN ? AND ? GROUP BY q.date ORDER BY q.date",
    [idunit, dateIn, dateOut],
    (err, result) => {
      for (let i = 0; i < result.length; i++) {
        const date = JSON.stringify(result[i].Dates);
        const dateM = date.split('"')[1].split("T")[0];
        data.Dates.push(dateM);
        data.AVG_G.push(result[i].AVG_G);
        data.AVG_A.push(result[i].AVG_A);
        data.AVG_B.push(result[i].AVG_B);
        data.AVG_C.push(result[i].AVG_C);
        data.AVG_D.push(result[i].AVG_D);
        data.AVG_E.push(result[i].AVG_E);
        data.AVG_L1.push(result[i].AVG_L1);
        data.AVG_L2.push(result[i].AVG_L2);
        data.AVG_L3.push(result[i].AVG_L3);
        data.AVG_L4.push(result[i].AVG_L4);
        data.AVG_L5.push(result[i].AVG_L5);
      }

      res.json({ lineData: data });
    }
  );
};
