import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection function
const ConnectMongoose = async () => {
  try {
    // Connect to MongoDB Atlas (without deprecated options)
    await mongoose.connect(process.env.MONGO_DB_URL, {
      serverSelectionTimeoutMS: 5000 // Wait for up to 5 seconds to connect to the server
    });
    console.log("Successfully connected to MongoDB Atlas");
  } catch (error) {
    // Detailed error logging for troubleshooting
    console.error("Error connecting to MongoDB:", error.message);

    // If the error is related to whitelisting, suggest a solution
    if (error.message.includes('IP address')) {
      console.error("It seems your IP address isn't whitelisted. Please whitelist your IP in MongoDB Atlas.");
    }

    // Optionally: terminate the process if the connection fails
    process.exit(1);
  }
};

export default ConnectMongoose;
