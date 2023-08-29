const UsersRepository = require("../repositories/users.repository");
const fs = require("fs");
const http = require("http");
const { passwordEncoder, passwordValidation } = require("../security/bcrypt");
const { generateToken } = require("../security/jwt");

const options = {
  hostname: "localhost",
  port: 3000,
  path: `/webhook/create-user`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    accept: "*",
  },
};

class UserService {
  static async getUsers() {
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
  }

  static async getUserById(id) {
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
  }

  static async signInUser(email, password) {
    try {
      const user = await UsersRepository.getUserByEmail(email);

      //Validate that the user if exists
      if (!user) return;

      //Setting image address for user
      const urlImage = `http://localhost:3000/public/images/users/${user.image}`;
      user.image = urlImage;

      //Validate that password is correct
      console.log({ password, passwordUser: user.password });
      const isValidpassword = await passwordValidation(password, user.password);
      console.log({ isValidpassword });

      if (!isValidpassword) return "Contraseña incorrecta";

      //Generate token with user data
      const { id, name, lastname, image } = user;
      const tokenGenerated = generateToken({
        id,
        name,
        lastname,
        email,
        image,
      });

      const userResponse = {
        user: { id, name, lastname, email, image },
        token: tokenGenerated,
      };

      return userResponse;
    } catch (error) {
      throw error;
    }
  }

  static async postUser(user) {
    try {
      const { name, lastname, email, password, image } = user;
      let nameImage = "Unknown_person.jpg";

      //validate that the image was loaded in request files, otherwise the default image 'unknown_person' will be loaded
      if (image) {
        // image = user.image;
        nameImage = image.name;
      }

      const path = __dirname;
      const pathImage = path.slice(0, 48) + "/public/images/users/" + nameImage;

      //Password encoder by bcryptjs
      const hashedPassword = await passwordEncoder(password);
      console.log(hashedPassword);

      //Save an user
      const userSaved = await UsersRepository.postUser({
        name,
        lastname,
        email,
        password: hashedPassword,
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
      // const reqWebhookUsers = http.request(options, (resWebhookUsers) => {
      //   console.log(`Status code: ${resWebhookUsers.statusCode}`);
      // });

      // reqWebhookUsers.on("error", (error) => {
      //   throw new Error(
      //     "Error al realizar la petición para enviar la notificación"
      //   );
      // });

      // reqWebhookUsers.write(JSON.stringify(userSaved));

      // reqWebhookUsers.end();

      return userSaved;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, user) {
    let hashedPassword;
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

      //Password encoder by bcryptjs
      if (password) {
        hashedPassword = await passwordEncoder(password);
        const userUpdated = await UsersRepository.updateUser(id, {
          name,
          lastname,
          email,
          password: hashedPassword,
          image: nameImage,
        });
        return userUpdated;
      }

      //Setting image address for user
      const urlImage = `http://localhost:3000/public/images/users/${nameImage}`;
      user.image = urlImage;

      const userUpdated = await UsersRepository.updateUser(id, {
        name,
        lastname,
        email,
        image: nameImage,
      });
      return {
        id,
        ...user,
      };
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
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
  }
}

module.exports = UserService;
