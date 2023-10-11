const express = require("express");
const router = express.Router();
const handleUploadImages = require("../config/multerConfig");

router
  .route("/")
  .post(
    handleUploadImages("pruebaFront", "images-collections"),
    (req, res) => {
    console.log({ req });
    console.log(req.files);
    res.sendStatus(204);
  });

module.exports = router;
