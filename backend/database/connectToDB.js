import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to the database: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error in connecting with the database: ${error.message}`);
  }
};
