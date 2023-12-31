const UsersService = require("../services/users.service");
const fs = require("fs");

class UserController {
  //Return the list of users
  static async getUsers(req, res) {
    try {
      const users = await UsersService.getUsers();

      res.status(200).json({
        status: "SUCCESS",
        message: "Lista de usuarios",
        details: users,
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
  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UsersService.getUserById(id);
      //Validate that the user if exists
      if (!user)
        return res.status(404).json({
          status: "ERROR",
          message: "Usuario no encontrado",
        });

      res.status(200).json({
        status: "SUCCESS",
        message: "Usuario encontrado con éxito.",
        details: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar obtener al usuario con id: " + id,
        error: error.message,
      });
    }
  }

  //return a validated user
  static async signInUser(req, res) {
    const { email, password } = req.body;
    try {
      const token = await UsersService.signInUser(email, password);
      //Validate that the user if exists
      if (!token)
        return res.status(404).json({
          status: "ERROR",
          message: "Usuario no encontrado",
        });

      if (typeof token === "string" && token.includes("Contraseña incorrecta"))
        return res.status(401).json({
          status: "ERROR",
          message: "Contraseña inválida",
        });

      res.status(200).json({
        status: "SUCCESS",
        message: "Usuario encontrado con éxito.",
        details: token,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar obtener al usuario con email: " + email,
        error: error.message,
      });
    }
  }

  //Add an user to the users table
  static async postUser(req, res) {
    try {
      const user = { ...req.body };
      user.image = req.files ? { ...req.files.image } : null;
      const newUser = await UsersService.postUser(user);

      res.status(201).json({
        status: "SUCCESS",
        message: "Usuario creado con éxito",
        details: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar crear un usuario",
        error: error.message,
        details: error.details,
      });
    }
  }

  //Modify an user by ID
  static async updateUser(req, res) {
    const { id } = req.params;

    try {
      const user = { ...req.body };
      user.image = req.files ? { ...req.files.image } : null;
      const userUpdated = await UsersService.updateUser(id, user);

      if (!userUpdated) {
        return res.status(404).json({
          status: "ERROR",
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        status: "SUCCESS",
        message: "Usuario actualizado con éxito.",
        details: userUpdated,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al intentar actualizar el usuario con id: " + id,
        error: error.message,
        details: error.details,
      });
    }
  }

  //Delete user by ID
  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const userDeleted = await UsersService.deleteUser(id);
      if (!userDeleted) {
        return res.status(404).json({
          status: "ERROR",
          message: "Usuario no encontrado",
        });
      }
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        mensaje: "Error al intentar eliminar al usuario con id: " + id,
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
