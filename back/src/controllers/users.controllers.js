const User = require("../models/users");
const fs = require("fs");

//Validations import
const userValidations = require("../utils/userValidate");

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
  //Validate that the param is type: integer
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({
      status: "ERROR",
      message: "Id no tiene formato válido",
    });
  }

  try {
    const user = await User.findByPk(id);

    //Validate that the user if exists
    if (!user)
      return res.status(404).json({
        status: "ERROR",
        message: "Usuario no encontrado",
      });

    //Setting image address for user
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
  let image;
  let nameImage = "Unknown_person";

  try {
    //Validations
    userValidations.requiredFields(req, res);
    userValidations.fieldsDefined(req, res);
    userValidations.dataType(req, res);

    //validate that the image was loaded in request files, otherwise the default image 'unknown_person' will be loaded
    if (req.files && Object.keys(req.files).includes("image")) {
      image = req.files.image;
      nameImage = image.name;
    }

    const path = __dirname;
    const pathImage = path.slice(0, 48) + "/public/images/users/" + nameImage;

    //Create an user
    const newUser = await User.create({
      name,
      lastname,
      email,
      password,
      image: nameImage,
    });

    //Move the image to server if exists
    if (image) {
      image.mv(pathImage, (error) => {
        if (error) {
          res.status(500).json({
            status: "ERROR",
            message: "Error al guardar la imagen en el servidor.",
            error,
          });
        }
      });
    }

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
  //Validate that the param is type: integer
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({
      status: "ERROR",
      message: "Id no tiene formato válido",
    });
  }

  try {
    //Validations
    userValidations.requiredFields(req, res);
    userValidations.fieldsDefined(req, res);
    userValidations.dataType(req, res);

    const user = await User.findByPk(id);

    //Validate that the user exists
    if (!user)
      return res.status(404).json({
        status: "Error",
        error: "Usuario no encontrado.",
      });

    const { name, lastname, email, password } = req.body;
    let image;
    let nameImage = "Unknown_person";

    //validate that the image was loaded in request files, otherwise the default image 'unknown_person' will be loaded
    if (req.files && Object.keys(req.files).includes("image")) {
      image = req.files.image;
      nameImage = image.name;
    }

    const path = __dirname;
    const pathImage = path.slice(0, 48) + "/public/images/users/" + nameImage;

    // Delete the previous image if it exists and is different of defualt image
    if (fs.existsSync(pathImage) && user.image !== "Unknown_person") {
      fs.unlinkSync(pathImage.replace(`${nameImage}`, `${user.image}`));
    }

    //Move the image to the server if exists
    if (image) {
      image.mv(pathImage, (error) => {
        if (error) {
          res.status(500).json({
            status: "ERROR",
            message: "Error al guardar la imagen en el servidor.",
            error,
          });
        }
      });
    }

    //Update user data
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.image = nameImage;

    await user.save();

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
  //Validate that the param is type: integer
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({
      status: "ERROR",
      message: "Id no tiene formato válido",
    });
  }

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
    if (fs.existsSync(pathImage) && user.image !== "Unknown_person") {
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
