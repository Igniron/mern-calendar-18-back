const mongoose = require ( 'mongoose' );

const dbConnection = async()=>
{
    try 
    {
        mongoose.set( "strictQuery", false);
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log ( 'DB online' );
    } 
    catch (error) 
    {
        console.log(error);
        throw new Error( 'Error, cannot connect.' );
    }
}

module.exports = 
{
    dbConnection,
}