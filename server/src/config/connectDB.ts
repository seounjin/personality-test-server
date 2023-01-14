import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log("process.env.MONGODB_URI ", process.env.MONGODB_URI )
export const initMongoDb = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(process.env.MONGODB_URI ?? '')
    .then(() => console.log("MongoDB conected"))
    .catch((err) => {
      console.log(err);
    });
};
