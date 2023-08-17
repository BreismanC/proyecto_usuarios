const models = require("../database/models");

class CommitRepository {
  static async getCommits() {
    return await models.commits.findAll();
  }

  static async getCommitById(id) {
    return await models.commits.findByPk(id);
  }

  static async postCommit(commit) {
    const { author, description, creation_date } = commit;
    return await models.commits.create({
      author,
      description,
      creation_date,
    });
  }
}

module.exports = CommitRepository;
