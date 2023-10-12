const express = require("express");
const router = express.Router();
const handleUploadImages = require("../config/multerConfig");
const UploadImagesController = require("../controllers/uploadImages.controller");

router
  .route("/")
  .post(
    handleUploadImages("images-collections"),
    UploadImagesController.uploadFile
  );

router.route("/:bucketName").get(UploadImagesController.getAllImages);
router.route("/:bucketName/:id").get(UploadImagesController.getImageById);

module.exports = router;
