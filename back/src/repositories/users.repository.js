const models = require("../database/models");

class UserRepository {
  static async getUsers() {
    return await models.users.findAll();
  }

  async getUserById(id) {
    return await models.users.findByPk(id);
  }

  async postUser(user) {
    return await models.users.create(user);
  }

  async updateUser(id, user) {
    return await models.users.update(user, { where: { id } });
  }

  async deleteUser(id) {
    return await models.users.destroy({ where: { id } });
  }
}

module.exports = UserRepository;
