const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await User.findAll();
    res.status(200).json({
      status: true,
      message: "Info route",
      userId: result,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
