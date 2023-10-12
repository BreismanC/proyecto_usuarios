const {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const globalConstants = require("./globalConstantsconfig");

const s3Instance = new S3Client({
  region: globalConstants.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: globalConstants.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: globalConstants.AWS_BUCKET_SECRET_ACCESS_KEY,
  },
});

module.exports = {
  s3Instance,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
};
