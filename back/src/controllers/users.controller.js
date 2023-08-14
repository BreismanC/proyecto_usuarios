const UsersService = require("../services/users.service");
const fs = require("fs");

//Validations import
const userValidations = require("../middlewares/usersValidators");

//Return the list of users
const getUsers = async (req, res) => {
  try {
    const users = await UsersService.getUsers();

    res.status(200).json({
      status: "SUCCESS",
      message: "Lista de usuarios",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar acceder a la lista de usuarios",
      error: error.message,
    });
  }
};

//Return a user by ID
const getUserById = async (req, res) => {
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
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar obtener al usuario con id: " + id,
      error: error.message,
    });
  }
};

//Add an user to the users table
const postUser = async (req, res) => {
  try {
    const user = { ...req.body };
    user.image = { ...req.files.image };
    const newUser = await UsersService.postUser(user);

    res.status(201).json({
      status: "SUCCESS",
      message: "Usuario creado con éxito",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar crear un usuario",
      error: error.message,
      details: error.details,
    });
  }
};

//Modify an user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = { ...req.body };
    user.image = { ...req.files.image };
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
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar actualizar el usuario con id: " + id,
      error: error.message,
      details: error.details,
    });
  }
};

//Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userDeleted = await UsersService.deleteUser(id);
    console.log({ userDeleted });
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
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
};
