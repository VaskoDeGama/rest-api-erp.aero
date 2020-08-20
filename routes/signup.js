const { Router } = require("express");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");
const { signupValidators } = require("../utils/validators");
const User = require("../models/User");

const router = Router();

router.post("/", signupValidators, async (req, res) => {
  try {
    const { id, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: "Validation failed",
        errors,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ id: id, password: hashPassword });
    return res.status(201).json({
      status: true,
      message: "User successful created",
      userId: result.id,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
