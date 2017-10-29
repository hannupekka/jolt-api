const _ = require('lodash');
const db = require('../db');
const { joltObjectToRow, joltRowToObject } = require('../db/utils');

const getJolts = async () => {
  const jolts = await db('jolt')
    .leftJoin('jolt_user', 'jolt.jolt_id', 'jolt_user.jolt_id')
    .select(['jolt.*', db.raw('ARRAY_AGG(jolt_user.user) as given_to')])
    .orderBy('jolt.created_at', 'desc')
    .groupBy('jolt.jolt_id');

  return jolts.map(joltRowToObject);
};

const giveJolt = (_jolt, _givenTo) =>
  db.transaction(async trx => {
    const jolts = await trx('jolt')
      .insert(joltObjectToRow(_jolt))
      .returning('*');

    const jolt = _.first(jolts);
    const { jolt_id } = jolt;
    const users = _givenTo.map(user => ({
      jolt_id,
      user,
    }));

    const givenTo = await trx('jolt_user')
      .insert(users)
      .returning('*')
      .map(user => _.get(user, 'user'));

    return _.merge({}, joltRowToObject(jolt), { givenTo });
  });

module.exports = {
  getJolts,
  giveJolt,
};
