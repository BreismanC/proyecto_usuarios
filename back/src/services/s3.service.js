const {
  s3Instance,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} = require("../config/s3config");
const fs = require("node:fs");
const globalConstants = require("../config/globalConstantsconfig");

class S3Service {
  static async uploadFile(file) {
    const uploadParams = {
      Bucket: globalConstants.AWS_BUCKET_NAME,
      Key: `${file.fieldname}/${file.originalname}`,
      Body: file.buffer,
    };
    const command = new PutObjectCommand(uploadParams);
    return await s3Instance.send(command);
  }

  static async getAllObjects(bucketName) {
    const command = new ListObjectsCommand({
      Bucket: bucketName,
    });
    return await s3Instance.send(command);
  }

  static async getbjectByKey(bucketName, key) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    return await s3Instance.send(command);
  }
}

module.exports = S3Service;
