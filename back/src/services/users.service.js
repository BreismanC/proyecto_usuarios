const UsersRepository = require("../repositories/users.repository");
const fs = require("fs");
const http = require("http");

const options = {
  hostname: "localhost",
  port: 3000,
  path: `/webhook/create-user`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "accept":"*",
  },
};

module.exports = {
  getUsers: async () => {
    try {
      const users = await UsersRepository.getUsers();
      users.forEach(
        (user) =>
          (user.image = `http://localhost:3000/public/images/users/${user.image}`)
      );
      return users;
    } catch (error) {
      throw error; // throw error to the controller
    }
  },

  getUserById: async (id) => {
    try {
      const user = await UsersRepository.getUserById(id);

      //Validate that the user if exists
      if (!user) return;

      //Setting image address for user
      const urlImage = `http://localhost:3000/public/images/users/${user.image}`;
      user.image = urlImage;

      return user;
    } catch (error) {
      throw error;
    }
  },

  postUser: async (user) => {
    try {
      const { name, lastname, email, password, image } = user;
      let nameImage = "Unknown_person";

      //validate that the image was loaded in request files, otherwise the default image 'unknown_person' will be loaded
      if (image) {
        // image = user.image;
        nameImage = image.name;
      }

      const path = __dirname;
      const pathImage = path.slice(0, 48) + "/public/images/users/" + nameImage;

      //Save an user
      const userSaved = await UsersRepository.postUser({
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

      // Realizar la solicitud HTTP a webhook
      const reqWebhookUsers = http.request(options, (resWebhookUsers) => {
        console.log(`Status code: ${resWebhookUsers.statusCode}`);
      });

      reqWebhookUsers.on("error", (error) => {
        throw new Error("Error al realizar la petición para enviar la notificación");
      });

      reqWebhookUsers.write(JSON.stringify(userSaved));

      reqWebhookUsers.end();

      return userSaved;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, user) => {
    try {
      const userFound = await UsersRepository.getUserById(id);

      //Validate that the user exists
      if (!userFound) return;

      const { name, lastname, email, password, image } = user;
      let nameImage = "Unknown_person";

      //validate that the image was loaded in request files, otherwise the default image 'unknown_person' will be loaded
      if (image) {
        nameImage = image.name;
      }

      const path = __dirname;
      const pathImage = path.slice(0, 48) + "/public/images/users/" + nameImage;

      // Delete the previous image if it exists and is different of defualt image
      if (fs.existsSync(pathImage) && userFound.image !== "Unknown_person") {
        fs.unlinkSync(pathImage.replace(`${nameImage}`, `${userFound.image}`));
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

      const userUpdated = await UsersRepository.updateUser(id, {
        name,
        lastname,
        email,
        password,
        image: nameImage,
      });
      return userUpdated;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    //Find the user in the database
    const user = await UsersRepository.getUserById(id);
    //Validate that the user exists
    if (!user) return;

    const path = __dirname;
    const pathImage = path.slice(0, 48) + "/public/images/users/" + user.image;

    //Delete user from database
    const userDeleted = await UsersRepository.deleteUser(id);

    //Delete the image if it exists
    if (fs.existsSync(pathImage) && user.image !== "Unknown_person") {
      fs.unlinkSync(pathImage);
    }
    return userDeleted;
  },
};
