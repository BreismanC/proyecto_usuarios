const User = require("../models/users");
const fs = require("fs");

//Return the list of users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    users.forEach(
      (user) =>
        (user.image = `http://localhost:3000/public/images/users/${user.image}`)
    );
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
    const user = await User.findByPk(id);

    //Validate that the user if exist
    if (!user)
      return res.status(404).json({
        status: "ERROR",
        message: "Usuario no encontrado",
      });

    //Estableciendo direccion de imagen para usuario
    const urlImage = `http://localhost:3000/public/images/users/${user.image}`;
    user.image = urlImage;

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
  const { name, lastname, email, password } = req.body;
  const image = req.files.image;
  const nameImage = image.name;
  const path = __dirname;
  const pathImage = path.slice(0, 48) + "/public/images/users/" + nameImage;

  try {
    //Create an user
    const newUser = await User.create({
      name,
      lastname,
      email,
      password,
      image: nameImage,
    });

    //Move the image to server
    image.mv(pathImage, (error) => {
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
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar crear un usuario",
      error: error.message,
    });
  }
};

//Modify an user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, password } = req.body;
  const image = req.files.image;
  const nameImage = image.name;
  const path = __dirname;
  const pathImage = path.slice(0, 48) + "/public/images/users/" + nameImage;

  try {
    const user = await User.findByPk(id);

    //Validate that the user exists
    if (!user)
      return res.status(404).json({
        status: "Error",
        error: "Usuario no encontrado.",
      });

    // Delete the previous image if it exists
    if (user.image) {
      fs.unlinkSync(pathImage.replace(`${nameImage}`, `${user.image}`));
    }

    //Update user data
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.image = nameImage;

    await user.save();

    //Move the image to the server
    image.mv(pathImage, (error) => {
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
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al intentar actualizar el usuario con id: " + id,
      error: error.message,
    });
  }
};

//Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    //Find the user in the database
    const user = await User.findByPk(id);

    //Validate that the user exists
    if (!user)
      return res.status(404).json({
        status: "Error",
        message: "Usuario no encontrado.",
      });

    const path = __dirname;
    const pathImage = path.slice(0, 48) + "/public/images/users/" + user.image;

    //Delete user from database
    await User.destroy({
      where: {
        id,
      },
    });

    //Delete the image if it exists
    if (user.image) {
      fs.unlinkSync(pathImage);
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
