const { checkAuth } = require("../auth/supabase");
const User = require("../models/User");
const crypto = require("crypto");

exports.getHealth = (req, res) => {
  res.json({ message: "Hello World!!!" });
};

exports.protectedRoute = async (req, res) => {
  try {
    const user = await checkAuth(req);
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.testDb = async (req, res) => {
  try {
    const currentDate = new Date().toISOString();
    const randomNumber = crypto.randomInt(1000000000, 9999999999);
    const users = await User.create({
      name: "test " + currentDate,
      email: "test-" + randomNumber + "@gmail.com",
      phone_number: randomNumber.toString(),
    });
    res.json({ users });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};