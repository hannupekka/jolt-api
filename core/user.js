const _ = require('lodash');
const axios = require('axios');

const { FUM_API_URL } = require('../config');

const pick = user =>
  _.pick(user, ['first_name', 'last_name', 'username', 'email']);

const getUsers = async req => {
  const cookie = _.get(req, 'headers.cookie', {});
  const response = await axios.get(FUM_API_URL, { headers: { cookie } });
  const currentUser = _.get(req, 'headers.remote-user');
  const users = _.get(response, 'data', []);

  if (!currentUser || !_.isArray(users)) {
    const error = new Error('Not logged in');
    error.status = 401;
    throw error;
  }

  return {
    currentUser,
    users: users.filter(user => _.get(user, 'status') === 'active').map(pick),
  };
};

module.exports = {
  getUsers,
};
