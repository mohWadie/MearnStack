const express = require("express");
const router = express.Router();
const usersModel = require("../models/User");
const { validationRegister } = require("../validation/userValidation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    let dob = String(req.body.DOB);
    let dob2 = dob.split("/");
    req.body.DOB = new Date(
      Number(dob2[2]),
      Number(dob2[1]) - 1,
      Number(dob2[0]) + 1
    );

    const { error } = validationRegister(req.body);
    console.log(error);
    if (error) return res.status(400).send(error);

    const user = new usersModel({
      userName: req.body.userName,
      email: req.body.email,
      FName: req.body.FName,
      LName: req.body.LName,
      DOB: req.body.DOB,
      storedPassword: req.body.password,
    });

    const userExists = await usersModel.findOne({ userName: user.userName });
    const emailExists = await usersModel.findOne({ email: user.email });
    if (userExists || emailExists)
      return res.status(400).send("username or email already exists");

    var salt = await bcrypt.genSalt(10);
    user.storedPassword = await bcrypt.hash(user.storedPassword, salt);

    await user.save().then((data) => {
      data = data.toObject();
      delete data._id;
      delete data.storedPassword;
      res.status(201).send(data);
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExists = await usersModel.findOne({ email: email });

    if (
      emailExists != null &&
      password &&
      (await bcrypt.compare(password, emailExists.storedPassword))
    ) {
      let currToken = generateToken(emailExists._id);
      let data = emailExists.toObject();
      data.token = currToken;
      delete data._id;
      delete data.storedPassword;
      res.json(data);
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = router;
