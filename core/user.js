const _ = require('lodash');
const axios = require('axios');

const { FUM_API_URL } = process.env;

const pick = user =>
  _.pick(user, ['first_name', 'last_name', 'username', 'email']);

const getUser = req => {
  const user = _.get(req, 'headers.remote-user');

  if (!user) {
    const error = new Error('Not logged in');
    error.status = 401;
    throw error;
  }

  return { user };
};

const getUsers = async req => {
  const cookie = _.get(req, 'headers.cookie', {});
  const response = await axios.get(FUM_API_URL, { headers: { cookie } });
  const users = _.get(response, 'data', []);

  if (!_.isArray(users)) {
    const error = new Error('Not logged in');
    error.status = 401;
    throw error;
  }

  return users.filter(user => _.get(user, 'status') === 'active').map(pick);
};

module.exports = {
  getUser,
  getUsers,
};
