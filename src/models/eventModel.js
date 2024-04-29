import mongoose, {Schema, model} from "mongoose";


const eventSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    //*este user va hacer referencia al otro modelo que se llama user, por ende cada evento va a tener a su userId. para saber que eventos pertenece a cada usuario que lo crea
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
   
});

eventSchema.method('toJSON', function(){
    const {__v, _id,...object } = this.toObject();
    object.id = _id;
    return object
})


export default model('Event', eventSchema);