const jwt = require ( 'jsonwebtoken' );

const generateJWT = ( uid, name )=>
{
    return new Promise ( ( resolve, reject ) =>
    {
        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '10h',
        }, ( err, token ) =>
        {
            if ( err )
            {
                console.log( err );
                reject( 'Cannot generate JWT' );
            }

            resolve( token );
        });


    });
    

}

module.exports =
{
    generateJWT,
}