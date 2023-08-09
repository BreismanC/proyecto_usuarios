const Usuario = require("../models/usuarios");
const fs = require("fs");

//Devuelve la lista de usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    usuarios.forEach(
      (usuario) =>
        (usuario.imagen = `http://localhost:3000/public/images/usuarios/${usuario.imagen}`)
    );
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

    //Validar que el usuario si existe
    if (!usuario)
      return res.status(404).json({
        status: "NOT FOUND",
        message: "Usuario no encontrado",
      });

    //Estableciendo direccion de imagen para usuario
    const urlImagen = `http://localhost:3000/public/images/usuarios/${usuario.imagen}`;
    usuario.imagen = urlImagen;

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
  const imagen = req.files.imagen;
  const nombreImagen = imagen.name;
  const path = __dirname;
  const pathImagen =
    path.slice(0, 48) + "/public/images/usuarios/" + nombreImagen;

  try {
    //Crear un usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      contrasena,
      imagen: nombreImagen,
    });

    //Mover la imagen al servidor
    imagen.mv(pathImagen, (error) => {
      if (error) {
        res.status(500).json({
          status: "ERROR",
          message: "Error al guardar la imagen en el servidor.",
          error,
        });
      }
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
  const imagen = req.files.imagen;
  const nombreImagen = imagen.name;
  const path = __dirname;
  const pathImagen =
    path.slice(0, 48) + "/public/images/usuarios/" + nombreImagen;

  try {
    const usuario = await Usuario.findByPk(id);

    //Validar que si exista el usuario
    if (!usuario)
      return res.status(404).json({
        status: "NOT FOUND",
        error: "User not found.",
      });

    // Eliminar la imagen anterior si existe
    if (usuario.imagen) {
      fs.unlinkSync(pathImagen.replace(`${nombreImagen}`, `${usuario.imagen}`));
    }

    //Actualizar datos de usuario
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.correo = correo;
    usuario.contrasena = contrasena;
    usuario.imagen = nombreImagen;

    await usuario.save();

    //Mover la imagen al servidor
    imagen.mv(pathImagen, (error) => {
      if (error) {
        res.status(500).json({
          status: "ERROR",
          message: "Error al guardar la imagen en el servidor.",
          error,
        });
      }
    });

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
    //Buscar el usuario en la base de datos
    const usuario = await Usuario.findByPk(id);

    //Validar que si exista el usuario
    if (!usuario)
      return res.status(404).json({
        status: "NOT FOUND",
        error: "User not found.",
      });

    const path = __dirname;
    const pathImagen =
      path.slice(0, 48) + "/public/images/usuarios/" + usuario.imagen;

    //Eliminar usuario de la base de datos
    await Usuario.destroy({
      where: {
        id,
      },
    });

    //Eliminar la imagen si existe
    if (usuario.imagen) {
      fs.unlinkSync(pathImagen);
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
  getUsuarios,
  getUsuarioById,
  postUsuario,
  updateUsuario,
  deleteUsuario,
};
