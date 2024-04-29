import Event from '../models/eventModel.js'


export const getEvents = async(req,res) => {

    //*lo que hace el populate, es mostrar la informacion que tiene el user que haya creado ese evento, por eso se conecta al otro modelo llamado user, por que hace referencia a los id de los usuarios que hayan creado ese evento.
    const events = await Event.find().populate('user', 'name') //*con el segundo argumento, especificamos que dato queremos mostrar, en este caso solo el name

    res.json({
        ok:true,
        events
    })

   
}


export const createEvent = async(req,res) => {

   

    const event = new Event(req.body);

    try {

        event.user = req.uid;

       const eventSave = await event.save();


       res.json({
        ok:true,
        eventSave
       })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error a la hora de registrar'
        })
    }

}


export const updateEvent = async(req,res) => {

    const eventId = req.params.id;
    const uid = req.uid


    try {

        const event = await Event.findById(eventId)

        if(!event){
            res.status(404).json({
                msg: 'no hay id'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                msg: 'no tiene privilegio para editar este evento'
            })

        }


        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent,{
            new: true
        });

        res.json({
            ok:true,
            eventUpdate
        })

        
    } catch (error) {
        res.status(500).json({
            msg: 'error en update'
        })
        console.log(error)
    }
}


export const deleteEvent = async (req,res) => {

    const eventId = req.params.id;
    const uid = req.uid


    try {

        const event = await Event.findById(eventId)

        if(!event){
           return res.status(404).json({
                msg: 'no existe evento con ese id'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                msg: 'no tiene privilegio para eliminar este evento'
            })

        }


        const eventDelete = await Event.findByIdAndDelete(eventId);

        res.json({
            ok:true,
            eventDelete
        })

        
    } catch (error) {
        res.status(500).json({
            msg: 'error en update'
        })
        console.log(error)
    }

   

}