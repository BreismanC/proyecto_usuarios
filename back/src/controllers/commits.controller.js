const CommitsService = require("../services/commits.service");

class commitsController {
  //Return the list of users
  static async getCommits(req, res) {
    try {
      const commits = await CommitsService.getCommits();

      res.status(200).json({
        status: "SUCCESS",
        message: "Lista de commits",
        details: commits,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar acceder a la lista de usuarios",
        error: error.message,
      });
    }
  }

  //Return a user by ID
  static async getCommitById(req, res) {
    const { id } = req.params;
    try {
      const commit = await CommitsService.getCommitById(id);
      //Validate that the commit if exists
      if (!commit)
        return res.status(404).json({
          status: "ERROR",
          message: "Commit no encontrado",
        });

      res.status(200).json({
        status: "SUCCESS",
        message: "Commit encontrado con éxito.",
        details: commit,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar obtener el commit con id: " + id,
        error: error.message,
      });
    }
  }

  //Add an user to the users table
  static async postCommit(req, res) {
    try {
      const commit = req.body;
      const newCommit = await CommitsService.postCommit(commit);

      res.status(201).json({
        status: "SUCCESS",
        message: "Commit creado con éxito",
        details: newCommit,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar crear un commit",
        error: error.message,
        details: error.details,
      });
    }
  }
}

module.exports = commitsController;
