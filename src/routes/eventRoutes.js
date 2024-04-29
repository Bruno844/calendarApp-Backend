import { Router } from "express";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controllers/eventController.js";
import { validateJwt } from "../middlewares/validateJwt.js";
import { check } from "express-validator";
import {validateCampos} from '../middlewares/validateCampos.js'
import { isDate } from "../helpers/isDate.js";

const router = Router();

//*todas deben pasar por la validacion del token
//*obtener eventos
router.get('/', validateJwt, getEvents);

router.post('/new-event',[
    check('title', 'el titulo obligfatorio').not().isEmpty(),
    check('start', 'la fecha es obligatoria').custom(isDate),
    check('end', 'la fecha de fin es obligatoria').custom(isDate), 
    validateCampos
], validateJwt, createEvent);

router.put('/update-event/:id', validateJwt, updateEvent);

router.delete('/delete-event/:id' , validateJwt, deleteEvent);


export default router
