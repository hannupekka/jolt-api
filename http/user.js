const { createJsonRoute } = require('../utils/express');
const userCore = require('../core/user');

const getUsers = createJsonRoute(req => userCore.getUsers(req));

module.exports = {
  getUsers,
};
