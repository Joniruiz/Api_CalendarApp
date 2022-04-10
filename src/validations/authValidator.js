const {check} = require('express-validator');

module.exports = [
    check('email').notEmpty()
    .withMessage('email is required')
    .isEmail().withMessage('email is not valid'),

    check('password').notEmpty()
    .withMessage('password is required')
]