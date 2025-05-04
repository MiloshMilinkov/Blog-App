import mongoose from "mongoose";

const connectDb = async () => {
    mongoose.set('strictQuery', false);
    return mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
}

export default connectDb