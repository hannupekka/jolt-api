const _ = require('lodash');
const changeCase = require('change-object-case');

const joltObjectToRow = obj => changeCase.snakeKeys(obj);
const joltRowToObject = row => {
  const obj = changeCase.camelKeys(row);
  obj.joltId = parseInt(_.get(obj, 'joltId'), 10);
  return obj;
};

module.exports = {
  joltObjectToRow,
  joltRowToObject,
};
