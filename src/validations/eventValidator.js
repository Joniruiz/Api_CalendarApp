const {check} = require('express-validator');
const moment = require('moment');
moment.locale('es');


module.exports = [
    check('title').notEmpty()
    .withMessage('Title is required'),

    check('start').notEmpty()
    .withMessage('Start date is required')
    .isDate().withMessage('Start date is not valid')
    .custom((value,{req}) =>{
        if(moment(value).diff(moment(),'days') < 0){
            return false
        }else{
            return true
        }
    }).withMessage('Start date must be greater than today'),
    check('end').notEmpty()
    .withMessage('End date is required')
    .isDate().withMessage('End date is not valid')
    .custom((value,{req}) =>{
        if(moment(value) < moment(req.body.start)){
            return false
        }else{
            return true
        }
    }).withMessage('End date must be greater than start date'),
]