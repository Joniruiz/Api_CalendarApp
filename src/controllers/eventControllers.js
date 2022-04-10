const Event = require('../database/models/Event');


module.exports = {
    all: async(req,res) => {
        try {
            const events = await Event.find().populate('user','name');

            return res.status(200).json({
                ok:true,
                data: events,
                total :events.length
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                message:'contact the administrator',
                error
            })
        }     
    },
    create : async (req,res) => {

        const event = new Event(req.body);

        try {

            event.user = req.uid;
            await event.save();
            return res.status(200).json({
                ok:true,
                message : 'Event created successfully',
            })
            
        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:'contact the administrator',
                error
            })
        }

    },
    update : async (req,res) => {

        const {id} = req.params;

        try {

            const event = await Event.findById(id);
            
            if(!event){
                return res.status(404).json({
                    ok : false,
                    message : 'Event not found'
                })
            }

            if(event.user.toString() !== req.uid){
                return res.status(401).json({
                    ok:false,
                    message:'Not authorized'
                })
            }

            const newEvent = {
                ...req.body,
                user : req.uid
            }

            await Event.findByIdAndUpdate(id,newEvent);

            return res.status(200).json({
                ok:true,
                message : 'Event updated successfully',
            })

        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:'contact the administrator',
                error
            })
        }
    },
    remove : async (req,res) =>{
        const {id} = req.params;

        try {

            const event = await Event.findById(id);

            if(!event){
                return res.status(404).json({
                    ok : false,
                    message: 'Event not found'
                })
            }

            if(event.user.toString() !== req.uid){
                return res.status(401).json({
                    ok : false,
                    message : 'not authorized'
                })
            }

            await Event.findByIdAndDelete(id);

            return res.status(200).json({
                ok : true,
                message : 'Event deleted successfully'
            })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'contact the administrator',
                error
            })
        }
    }
}