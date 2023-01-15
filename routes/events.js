/*
    Events routes / Events
    host + /api/events
*/

const { Router } = require ( 'express' );
const router = Router();


const { check } = require( 'express-validator' );

const { createEvent, readEvents, updateEvent, deleteEvent } = require ( '../controllers/events' );

const { validateCamps } = require ( '../middlewares/validate-camps' );
const { validarJWT } = require ( '../middlewares/validarJWT' );
const { isDate } = require('../helpers/isDate');



router.use( validarJWT );

//Create events
router.post (
    '/new',
    [
        check( 'title', 'Title is required').not().isEmpty(),
        check( 'start', 'Start date is required').custom( isDate ),
        check( 'end', 'End date is required').custom( isDate ),
        validateCamps,
    ], 
    createEvent 
    );

//Read events
router.get ('/', readEvents );

//Update event
router.put ('/:id', updateEvent );

//Delete event
router.delete ('/:id', deleteEvent );


module.exports = router;