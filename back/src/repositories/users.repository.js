const models = require("../database/models");

class UserRepository {
  static async getUsers() {
    return await models.users.findAll();
  }

  static async getUserById(id) {
    return await models.users.findByPk(id);
  }

  static async getUserByEmail(email) {
    return await models.users.findOne({ where: { email } });
  }

  static async postUser(user) {
    return await models.users.create(user);
  }

  static async updateUser(id, user) {
    return await models.users.update(user, { where: { id } });
  }

  static async updateFieldUserByEmail(payload, email) {
    return await models.users.update(payload, {
      where: { email },
    });
  }

  static async deleteUser(id) {
    return await models.users.destroy({ where: { id } });
  }
}

module.exports = UserRepository;
