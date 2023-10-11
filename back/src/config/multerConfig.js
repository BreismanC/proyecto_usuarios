const multer = require("multer");
const path = require("node:path");

const MIMETYPES = ["image/jpeg", "image/png", "image/jpg"];

const handleUploadImages = (location, nameInput) => {
  const multerUpload = multer({
    storage: multer.diskStorage({
      destination: path.join(
        __dirname,
        "../..",
        `public/images/gallery/${location}`
      ),
      filename: (req, file, callback) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = file.originalname.split(fileExtension)[0];

        callback(null, `${Date.now()}-${fileName}${fileExtension}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (MIMETYPES.includes(file.mimetype)) callback(null, true);
      else
        throw new Error(
          `Invalid formart. Only this formats are allowed: ${MIMETYPES.join(
            " "
          )}`
        );
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // limit file size to 5MB (value in bytes)
    },
  });

  return multerUpload.single(nameInput);
};

module.exports = handleUploadImages;
