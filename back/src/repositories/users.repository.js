const models = require("../database/models");

module.exports = {
  getUsers: async () => {
    return await models.users.findAll();
  },

  getUserById: async (id) => {
    return await models.users.findByPk(id);
  },

  postUser: async (user) => {
    return await models.users.create(user);
  },

  updateUser: async (id, user) => {
    return await models.users.update(user, { where: { id } });
  },

  deleteUser: async (id) => {
    return await models.users.destroy({ where: { id } });
  },
};
