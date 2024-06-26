import mongoose, {Schema, model} from "mongoose";


const userSchema = Schema({
    name: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


export default model('User', userSchema);