const UploadImagesService = require("../services/UploadImages.service");

class UploadImagesController {
  static async uploadFile(req, res) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          status: "ERROR",
          message: "Image not found or invalid format",
          details:
            "The image you are trying to upload does not have a valid format or was not uploaded in the request",
        });
      }

      const imageData = req.body;
      console.log(imageData);
      const response = await UploadImagesService.upload(file);
      response.imageName = `${file.fieldname}/${file.originalname}`;
      res.status(200).json({
        status: "SUCCESS",
        message: "Archivo subido",
        details: response,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar subir el archivo al servidor",
        error: error.message,
      });
    }
  }

  static async getAllImages(req, res) {
    try {
      const { bucketName } = req.params;
      const response = await UploadImagesService.getAllImages(bucketName);
      res.status(200).json({
        status: "SUCCESS",
        message: "Datos obtenidos con éxito",
        details: response,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar obtener los archivos",
        error: error.message,
      });
    }
  }

  static async getImageById(req, res) {
    try {
      const { bucketName } = req.params;
      const { id } = req.params;
      const response = await UploadImagesService.getImageById(bucketName, id);
      res.status(200).json({
        status: "SUCCESS",
        message: "Archivo obtenido con éxito",
        details: response,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar obtener el archivo",
        error: error.message,
      });
    }
  }
}

module.exports = UploadImagesController;
