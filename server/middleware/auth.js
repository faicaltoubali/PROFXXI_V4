const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "jwtSecret");

      req.userId = decodedData.id;
      req.userEmail = decodedData.email;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
