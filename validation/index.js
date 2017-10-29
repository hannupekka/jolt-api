const Joi = require('joi');
const _ = require('lodash');

// Validation schemas.
const common = {
  user: Joi.string()
    .length(4)
    .required()
    .error(() => ({ message: 'Invalid user' })),
};

const schemas = {
  common,
  jolt: Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    givenTo: Joi.array()
      .items(common.user.error(e => ({ message: `givenTo: ${e}` })))
      .min(1)
      .required(),
  }),
};

/**
 * Get schema by name.
 * @param {string} name
 */
const getSchema = name => {
  const joiObj = _.get(schemas, name);
  if (!joiObj) {
    throw new Error(`Schema with name ${name} was not found`);
  }
  return joiObj;
};

/**
 * Throws formatted errors when schema validation fails.
 * @param {object} err
 */
const throwJoiError = err => {
  // See https://github.com/hapijs/joi/blob/v7.2.3/API.md#errors
  const msg = _.get(err, 'details.0.message') || 'Validation error';
  const newErr = new Error(msg);
  newErr.status = 400;
  throw newErr;
};

/**
 * Validates given object against schema.
 * @param {object} obj
 * @param {string} schemaName
 */
const assert = (obj, schemaName) => {
  const joiObj = getSchema(schemaName);

  // All this hassle to get joi to format nice error messages
  const content = {};
  content[schemaName] = obj;

  const expected = {};
  expected[schemaName] = joiObj;

  try {
    Joi.assert(content, expected);
  } catch (err) {
    if (!err.isJoi) {
      throw err;
    }

    throwJoiError(err);
  }

  // Return for convenience
  return obj;
};

module.exports = assert;
