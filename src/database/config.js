import mongoose from "mongoose";

export const dbConnection = async() => {
    
    try {

        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('db corriendo!!')

    } catch (error) {
        console.log(error)
        throw new Error('error en la db')
    }
}