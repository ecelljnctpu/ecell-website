const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check email
  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check hashed password
  const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate Token (3 days validity)
  const token = jwt.sign(
    { email: process.env.ADMIN_EMAIL, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
  });
};

module.exports = { adminLogin };