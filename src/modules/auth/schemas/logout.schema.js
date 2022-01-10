const validators = require('../../../utils/validators.util');

module.exports = [validators.refreshToken, validators.resourceIdInBody('user_id')];
