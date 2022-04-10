const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');

const {all,create,update,remove} = require('../controllers/eventControllers');
const validationFields = require('../middlewares/validationFields');
const validationJWT = require('../middlewares/validationJWT');
const eventValidator = require('../validations/eventValidator');
const updateValidator = require('../validations/updateValidator');

/* /api/events  */

router.use(validationJWT)

router.get('/',all)
router.post('/',eventValidator,validationFields,create)
router.put('/:id',updateValidator,check('id','is not a valid mongodb id')
.isMongoId(),validationFields,update)
router.delete('/:id',check('id','is not a valid mongodb id')
.isMongoId(),validationFields,remove)

module.exports = router;