const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const token = req.body.token ||req.cookies|| req.query.token || req.headers["token"];
  // const token = req.header("token"); Ok
  // const token = req.headers["token"]; OK
  // const token = req.body.token; ok
  //  const token = req.query.token; Ok - but not safe to pass token via URL?? 
  //const token = req.cookies ; Not OK --require cookie-parse??

  const token = req.body.token || req.query.token || req.headers["token"]||req.header("token");

  if (!token) {
    return res
      .status(200)
      .json({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = decoded;
  } catch (err) {
    return res.status(200).json({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
