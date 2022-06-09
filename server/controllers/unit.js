const db = require("../database/database");

exports.createUnit = async (req, res) => {
  const unit = req.body.unit;
  console.log(req.userEmail);

  db.query(
    "INSERT INTO units (name,type,description, access) VALUES (?,?,?,?)",
    [unit.unitName, unit.unitType, unit.unitDescription, unit.accessType],
    (err, result) => {
      if (result) {
        console.log(result);
        let unitid = result.insertId;
        db.query(
          "INSERT INTO unitgeneration (email,idunit) VALUES (?,?)",
          [req.userEmail, unitid],
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

exports.updateUnit = async (req, res) => {
  const idunit = req.params.id;
  const unit = req.body.unit;
  console.log(req.userEmail);
  db.query(
    "UPDATE units SET name=? , type =? , description =? , access =? WHERE idunit=?",
    [
      unit.unitName,
      unit.unitType,
      unit.unitDescription,
      unit.accessType,
      idunit,
    ],
    (err, result) => {
      if (result) {
        res.json({
          updated: true,
          message: "The Unit was successfuly updated",
        });
      } else {
        res.json({
          updated: false,
          message:
            "There has been an error while updating the unit, please try later",
        });
      }
    }
  );
};

exports.deleteUnit = async (req, res) => {
  const idunit = req.params.id;
  console.log(req.userEmail);
  db.query("DELETE FROM units WHERE idunit=?", [idunit], (err, result) => {
    if (result) {
      res.json({ deleted: true, message: "The Unit was successfuly deleted" });
    } else {
      res.json({
        deleted: false,
        message:
          "There has been an error while deleting the unit, please try later",
      });
    }
  });
};

exports.getAllUnits = async (req, res) => {
  //console.log(req);
  console.log(req.userEmail);
  db.query(
    "SELECT * FROM units JOIN unitgeneration ON unitgeneration.idunit = units.idunit WHERE unitgeneration.email = ?",
    [req.userEmail],
    (err, result) => {
      if (result) {
        var i = 0;
        let unitsResult = [];
        while (result[i]) {
          const { idunit, name, description, type, access } = result[i];
          const unit = {
            idunit: idunit,
            name: name,
            description: description,
            type: type,
            access: access,
          };
          unitsResult.push(unit);
          i = i + 1;
        }

        res.json({ unitsResult: unitsResult });
      } else {
        res
          .status(404)
          .json({ message: "Error while finding your user units" });
      }
    }
  );
};

exports.getUnitsNumber = async (req, res) => {
  console.log(req.userEmail);
  db.query(
    "SELECT COUNT(*) as num from unitgeneration WHERE email = ?",
    [req.userEmail],
    (err, result) => {
      if (result) {
        res.json({ unitsNumber: result[0].num });
      }
    }
  );
};

exports.getTotalUnitsNumber = async (req, res) => {
  db.query("SELECT COUNT(*) as num FROM unitgeneration", (err, result) => {
    if (result) {
      res.json({ totalUnitsNumber: result[0].num });
    }
  });
};
