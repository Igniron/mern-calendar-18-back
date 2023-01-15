const { response } = require ( 'express' );
const Event = require ( '../models/Event' );


const createEvent = async( req, res = response )=>
{
    const event = new Event ( req.body );


    try 
    {
        event.user = req.uid;

       await event.save();
       res.status(201).json({
            ok: true,
            event,
       })
        
    } 
    catch (error) 
    {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error, please talk to an administrator.',
        })
    }

}

const readEvents = async( req, res = response )=>
{
    const events = await Event.find().populate( 'user', 'name' );

    res.status(201).json({
        ok: true,
        events,
     });
}

const updateEvent = async( req, res = response )=>
{
    const eventId = req.params.id;
    const { uid } = req;

    try 
    {
        const event = await Event.findById( eventId );
        if ( !event )
        {
            return res.status(404).json({
                ok: false,
                msg: 'the event does not exist',
            });
        }

        if ( event.user.toString() !== uid )
        {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to edit this event',
            })
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );
        res.status(201).json({
            ok: true,
            msg: 'Event updated',
            updatedEvent,
        })

    } 
    catch (error) 
    {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error, please talk to an administrator.',
        });
    }

}

const deleteEvent = async( req, res = response )=>
{
    const eventId = req.params.id;
    const { uid } = req;

    try 
    {
        const event = await Event.findById( eventId );
        if ( !event )
        {
            return res.status(404).json({
                ok: false,
                msg: 'the event does not exist',
            });
        }

        if ( event.user.toString() !== uid )
        {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to edit this event',
            })
        }

        await Event.findByIdAndDelete( eventId );
        res.status(201).json({
            ok: true,
            msg: 'Event deleted',
        })

    } 
    catch (error) 
    {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error, please talk to an administrator.',
        });
    }

}

module.exports =
{
    createEvent,
    deleteEvent,
    readEvents,
    updateEvent,
}