const {check} = require('express-validator');

module.exports = [
    check('name').notEmpty()
    .withMessage('name is required'),

    check('email').notEmpty()
    .withMessage('email is required')
    .isEmail().withMessage('email is not valid'),

    check('password').notEmpty()
    .withMessage('password is required')
    .isLength({min:6})
    .withMessage('password must be at least 6 characters long')
]