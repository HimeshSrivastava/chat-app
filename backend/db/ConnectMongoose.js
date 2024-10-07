import mongoose from 'mongoose'
import dotenv from 'dotenv';


dotenv.config({ path: '../.env'});


const ConnectMongoose = async() => {
 try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Server is connected");
 } catch (error) {
      console.log(error);
 }
}

export default ConnectMongoose
