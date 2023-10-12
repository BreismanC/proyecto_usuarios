const S3Service = require("./s3.service");

class UploadImagesService {
  static async upload(file) {
    try {
      return await S3Service.uploadFile(file);
    } catch (error) {
      throw error;
    }
  }

  static async getAllImages(bucketName) {
    try {
      return await S3Service.getAllObjects(bucketName);
    } catch (error) {
      throw error;
    }
  }

  static async getImageById(bucketName, id) {
    try {
      const result = await S3Service.getbjectByKey(bucketName, id);
      return result.$metadata;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UploadImagesService;
