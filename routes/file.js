const { Router } = require("express");
const path = require("path");
const tokenVerify = require("../middleware/tokenVerify");
const fileUploader = require("../utils/fileUploader");
const File = require("../models/File");

const router = Router();

router.post(
  "/upload",
  tokenVerify,
  fileUploader.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: "No file",
        });
      }
      File.create({
        name: req.file.filename,
        type: req.file.mimetype,
        extension: path.extname(req.file.originalname),
        size: req.file.size,
        uploadAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        userId: req.userId,
      })
        .then((response) => {
          return res.status(200).json({
            status: true,
            message: "A file successful uploaded",
            response,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            status: false,
            message: "A file not uploaded",
            err,
          });
        });
    } catch (e) {
      console.log(e);
    }
  }
);

router.get("/list", tokenVerify, async (req, res) => {
  try {
    const { list_size, page } = req.body;
    console.log(list_size, page);
    File.findAndCountAll({
      limit: list_size ? list_size : 10,
      offset: page ? (page - 1) * list_size : 0,
    }).then((response) => {
      return res.status(200).json({
        status: true,
        message: "A list file",
        list_size,
        page,
        ...response,
      });
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
