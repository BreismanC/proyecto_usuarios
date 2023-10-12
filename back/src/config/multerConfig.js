const multer = require("multer");
const path = require("node:path");

const MIMETYPES = ["image/jpeg", "image/png", "image/jpg"];

const handleUploadImages = (nameInput) => {
  const multerUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
      if (MIMETYPES.includes(file.mimetype)) callback(null, true);
      else {
        req.invalidFormat = `Invalid formart. Only this formats are allowed: ${MIMETYPES.join(
          " "
        )}`;
        return callback(null, false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // limit file size to 5MB (value in bytes)
    },
  });

  return multerUpload.single(nameInput);
};

module.exports = handleUploadImages;
