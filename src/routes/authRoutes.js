import {Router} from 'express'
import { loginUser, registerUser, renewToken } from '../controllers/authController.js';
import { check } from 'express-validator';
import { validateCampos } from '../middlewares/validateCampos.js';
import { validateJwt } from '../middlewares/validateJwt.js';


const router = Router();



router.post(
    '/register',
    [
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'minimo 6 digitos').isLength({min: 6}),
        validateCampos
    ],
    registerUser
);

router.post(
    '/login', 
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'minimo 6 digitos').isLength({min: 6}),
        validateCampos
    ],
    loginUser
);

router.get('/renew',validateJwt, renewToken)





export default router