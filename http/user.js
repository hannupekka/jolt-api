const { createJsonRoute } = require('../utils/express');
const userCore = require('../core/user');

const getUser = createJsonRoute(req => userCore.getUser(req));
const getUsers = createJsonRoute(req => userCore.getUsers(req));

module.exports = {
  getUser,
  getUsers,
};
