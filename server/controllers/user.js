const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db = require("../database/database");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const saltRounds = 10;

exports.register = async (req, res) => {
  const user = req.body.user;
  try {
    db.query(
      "SELECT * from users WHERE email= ?",
      [user.email],
      (err, result) => {
        if (err) {
          res.json({ message: err });
        } else {
          if (result.length > 0) {
            res.json({
              message:
                "A user with this email is already created, please change the email",
            });
          } else {
            bcrypt.hash(user.password, saltRounds, (err, hash) => {
              db.query(
                "INSERT INTO users (email, firstName, password, position, organizationName,country, lastName, profile, universityWebsite) VALUES (?,?,?,?,?,?,?,?,?) ",
                [
                  user.email,
                  user.firstName,
                  hash,
                  user.position,
                  user.organizationName,
                  user.country,
                  user.lastName,
                  user.profile,
                  user.universityWebsite,
                ],
                (err, result) => {
                  if (err) {
                    res.json({ message: err });
                  } else {
                    // const token = jwt.sign(
                    //   { email: user.email, id: user.id },
                    //   "jwtSecret",
                    //   {
                    //     expiresIn: "1h",
                    //   }
                    // );
                    res.status(201).json({
                      message: "User created successfuly ! Please login in",
                      user: user,
                    });
                  }
                }
              );
            });
          }
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      if (result.length > 0) {
        const user = result[0];
        bcrypt.compare(password, result[0].password, (loginerr, loginres) => {
          if (loginres) {
            const token = jwt.sign(
              { email: user.email, id: user.id },
              "jwtSecret",
              {
                expiresIn: "1h",
              }
            );
            res.status(200).json({ loggedIn: true, user: user, token: token });
          } else {
            res.json({ loggedIn: false, message: "Wrong password" });
          }
        });
      } else {
        res.json({ loggedIn: false, message: "No user found with this email" });
      }
    }
  });
};

exports.forgotPassword = async (req, res, next) => {
  const email = req.body.email;
  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (result.length > 0) {
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordToken = crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");

        // Expiration of the token in 30 minutes
        const resetPasswordExpire = Date.now() + 30 * 60 * 1000;
        console.log(resetPasswordExpire);
        db.query(
          "UPDATE users SET resetPasswordToken=?, resetPasswordExpire=? WHERE email=? ",
          [resetPasswordToken, resetPasswordExpire, email],
          (err, result) => {
            if (result) {
              // Create reset url to email to provided email
              const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

              // HTML Message
              const message = `
            <h2>You have requested a password reset on PROFXXI IRIT Platform</h2>
            <p>Please click on the following link in order the reset your password:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            <p>This link will expire in 30 minutes, once this duration expires you will have to proceed a new password reset request </p>
            `;

              try {
                sendEmail({
                  to: email,
                  subject: "Password Reset Request - PROFXXI IRIT Platform",
                  text: message,
                });
                res.json({
                  sent: true,
                  message:
                    "an URL has been sent to your email address to reset your password",
                });
              } catch (err) {
                console.log(err);
                next(err);
              }
            } else {
              console.log(err);
              res.json({
                sent: false,
                message: "Error ! make sure you typed a valid email",
              });
            }
          }
        );
      } else {
        res.json({
          sent: false,
          message: "Error ! make sure you typed a valid email",
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.resetForgotPassword = async (req, res, next) => {
  const password = req.body.password;
  const actualdate = Date.now();
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  db.query(
    "SELECT * FROM users WHERE resetPasswordToken =?",
    [resetPasswordToken],
    (err, result) => {
      if (result.length > 0) {
        console.log(result[0].id);
        console.log(password);

        if (actualdate < parseInt(result[0].resetPasswordExpire)) {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            db.query(
              "UPDATE users SET password = ? WHERE id = ?",
              [hash, result[0].id],
              (err, result) => {
                console.log(result);
                if (result) {
                  res.json({ message: "Password is successfully resetted" });
                } else {
                  res.json({
                    message: "Error while resetting the password",
                  });
                }
              }
            );
          });
        } else {
          res.json({
            message:
              "Validation time has ended, please request again your password reset",
          });
        }
      }
    }
  );
};

exports.update = async (req, res) => {
  const email = req.body.email;
  const user = req.body.user;
  console.log(email);
  db.query(
    "UPDATE users SET email = ?, firstName = ?, lastName = ?, position= ?, organizationName= ?,profile = ?, universityWebsite = ? WHERE id = ?",
    [
      user.email,
      user.firstName,
      user.lastName,
      user.position,
      user.organizationName,
      user.profile,
      user.universityWebsite,
      req.userId,
    ],
    (err, result) => {
      if (result) {
        res.json({
          user: user,
          message: "Your profile has been updated successfuly",
        });
      } else {
        res.json({
          message: "There has been an error while updating your profile",
        });
      }
    }
  );
};

exports.deleteProfile = async (req, res) => {
  db.query(
    "DELETE FROM users WHERE email=?",
    [req.userEmail],
    (err, result) => {
      if (result) {
        res.json({ message: "Your profile has been succesfully deleted" });
      } else {
        res.json({
          message: "There has been an error while deleting the profile",
        });
      }
    }
  );
};

exports.deleteData = async (req, res) => {
  db.query(
    "DELETE u FROM units u JOIN unitgeneration g ON u.idunit = g.idunit WHERE g.email = ?",
    [req.userEmail],
    (err, result) => {
      if (result) {
        res.json({
          message: "All your data has been succesfully deleted",
        });
      } else {
        res.json({
          message:
            "There has been an error while deleting all your data, please try later",
        });
      }
    }
  );
};

exports.resetPassword = async (req, res) => {
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hash, req.userEmail],
      (err, result) => {
        if (result) {
          res.json({ message: "Your password has been successfully resetted" });
        } else {
          res.json({
            message: "There has been an error while resetting your password",
          });
        }
      }
    );
  });
};

exports.getTotalUniversitiesNumber = async (req, res) => {
  db.query(
    "SELECT COUNT(DISTINCT users.organizationName) as num FROM users",
    (err, result) => {
      if (result) {
        res.json({ totalUniversitiesNumber: result[0].num });
      }
    }
  );
};

exports.contact = async (req, res, next) => {
  const data = req.body;
  console.log(data);

  const infos = `<h3> Email From The following User: </h3>
  <h3>Name :${data.name} </h3>
  <h3>Organization Name :${data.organization} </h3>
  <h3>Email : ${data.email} </h3>
  <h3> About the topic : ${data.topic} </h3>
  <p> ${data.message} </p>

  `;

  try {
    sendEmail({
      to: process.env.EMAIL_FROM,
      subject: data.topic,
      text: infos,
    });
  } catch (err) {
    next(err);
  }
};
