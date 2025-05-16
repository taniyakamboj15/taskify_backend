const validator = require("validator");
const validateUserSignup = (req, res, next) => {
  const { name, email, password, country } = req.body;

  if (!name || !email || !password || !country) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (!validator.isAlpha(name)) {
    return res.status(400).json({ message: "Name must contain only letters" });
  }
  if (!validator.isAlpha(country)) {
    return res
      .status(400)
      .json({ message: "Country must contain only letters" });
  }
  if (!validator.isLength(name, { min: 3 })) {
    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters long" });
  }
  if (!validator.isStrongPassword(password)) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  next();
};
module.exports = validateUserSignup;
