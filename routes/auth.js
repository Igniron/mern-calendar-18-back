/*
    User routes / Auth
    host + /api/auth
*/

const { Router } = require ('express');
const router = Router();

const { check } = require( 'express-validator' );

const { validateCamps } = require ( '../middlewares/validate-camps' );
const { validarJWT } = require ( '../middlewares/validarJWT' );

const { createUser, loginUser, renewToken } = require ( '../controllers/auth' );

router.post(
        '/new',
        [ //middlewares
            check( 'name', 'Name is required' ).not().isEmpty(),
            check( 'email', 'Email is required' ).isEmail(),
            check( 'password', 'Password must have more than 6 characters' ).isLength( { min: 6} ),
            validateCamps,
        ],
        createUser,
    );

router.post(
        '/', 
        [
            check( 'email', 'Email is required' ).isEmail(),
            check( 'password', 'Password must have more than 6 characters' ).isLength( { min: 6} ),
            validateCamps,
        ],
        loginUser,
    );

router.get('/renew', validarJWT,  renewToken );


module.exports = router;