const validators = require('../../../utils/validators.util');

module.exports = [validators.password, validators.confirmPassword('password')];
