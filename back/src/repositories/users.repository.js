const models = require("../database/models");

class UserRepository {
  static async getUsers() {
    return await models.users.findAll();
  }

  static async getUserById(id) {
    return await models.users.findByPk(id);
  }

  static async postUser(user) {
    return await models.users.create(user);
  }

  static async updateUser(id, user) {
    return await models.users.update(user, { where: { id } });
  }

  static async deleteUser(id) {
    return await models.users.destroy({ where: { id } });
  }
}

module.exports = UserRepository;
