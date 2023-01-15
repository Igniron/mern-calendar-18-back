const { response } = require ( 'express' );
const bcrypt = require ( 'bcryptjs' );
const User = require ( '../models/User' );
const { generateJWT } = require ( '../helpers/jwt' );


const createUser = async( req, res = response )=>
{
    const { email, password } = req.body;

    try 
    {
        let user = await User.findOne( { email } );
        
        if( user )
        {
            return res.status(400).json({
                ok: false,
                msg: 'User already exist with that email.'
            });
        }

        user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Guardar en DB
        await user.save();

        //Generar JWT

        const token = await generateJWT ( user.id, user.name );
     
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
         });
        
    } 
    catch (error) 
    {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error, please talk to an administrator.'
        });
    }

}

const loginUser = async( req, res = response )=>
{
    const { email, password } = req.body;

    try 
    {
        let user = await User.findOne( { email } );
        
        if( !user )
        {
            return res.status(400).json({
                ok: false,
                msg: 'Username does not exist.'
            });
        }

        // Confirm passowrds
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword )
        {
            return res.status(400).json({
                ok: false,
                msg: 'Password does not match.'
            });
        }

        //Generate JWT
        const token = await generateJWT ( user.id, user.name );


        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        })

    } 
    catch (error) 
    {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error, please talk to an administrator.'
        });
    }

}

const renewToken = async ( req, res = response )=>
{
    const { uid, name } = req;

    //Generate JWT
    const token = await generateJWT ( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
}

module.exports =
{
    createUser,
    loginUser,
    renewToken,
}