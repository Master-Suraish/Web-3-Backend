import mongoose from "mongoose";

export const connectingMongoDB = async () => {
  try {
    const uri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");
    console.log(uri);
  } catch (error) {
    console.error("Sorry, MongoDD not connected", error);
  }
};
