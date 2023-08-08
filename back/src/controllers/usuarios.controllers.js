const Usuario = require("../models/usuarios");

//Devuelve la lista de usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({
      status: "SUCCESS",
      message: "Lista de usuarios",
      data: usuarios,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar acceder a la lista de usuarios",
      error: error.message,
    });
  }
};

//Devuelve un usuario por ID
const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario)
      return res.status(404).json({
        status: "NOT FOUND",
        message: "Usuario no encontrado",
      });

    res.status(200).json({
      status: "SUCCESS",
      message: "Usuario encontrado con éxito.",
      data: usuario,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar obtener al usuario con id: " + id,
      error: error.message,
    });
  }
};

//Agrega un usuario a la lista de usuarios
const postUsuario = async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;
  try {
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      contrasena,
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "Usuario creado con éxito",
      data: nuevoUsuario,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar crear un usuario",
      error: error.message,
    });
  }
};

//Modifica un usuario por ID de la lista de usuarios
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, contrasena } = req.body;
  try {
    const usuario = await Usuario.findByPk(id);
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.correo = correo;
    usuario.contrasena = contrasena;

    await usuario.save();
    res.status(200).json({
      status: "SUCCESS",
      message: "Usuario actualizado con éxito.",
      data: usuario,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar actualizar el usuario con id: " + id,
      error: error.message,
    });
  }
};

//Elimina un usuario por ID
const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.destroy({
      where: {
        id,
      },
    });
    res.status(204);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      mensaje: "Error al intentar eliminar al usuario con id: " + id,
      error: error.message,
    });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  postUsuario,
  updateUsuario,
  deleteUsuario,
};
