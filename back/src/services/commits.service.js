const CommitRepository = require("../repositories/commits.repository");
const fs = require("fs");
const http = require("http");

class CommitService {
  static async getCommits() {
    try {
      const commits = await CommitRepository.getCommits();
      return commits;
    } catch (error) {
      throw error;
    }
  }

  static async getCommitById(id) {
    try {
      const commit = await CommitRepository.getCommitById(id);

      //Validate that the commit if exists
      if (!commit) return;

      return commit;
    } catch (error) {
      throw error;
    }
  }

  static async postCommit(commit) {
    try {
      const commitSaved = await CommitRepository.postCommit(commit);
      return commitSaved;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommitService;
