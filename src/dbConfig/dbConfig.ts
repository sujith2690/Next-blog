import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('MongoDB Connected')
        })
        connection.on('error', (err) => {
            console.log('MongoDB connection error, please check your DB: ' + err)
            process.exit()
        })
        
    } catch (error) {
        console.log('Error in Connecting DB')
        console.log(error)
    }

}