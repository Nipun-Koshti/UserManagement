import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/fourtyfour`);
        console.log("db connected....");
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB