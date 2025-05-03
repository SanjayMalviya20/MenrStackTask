import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database connected")).catch((err) => console.log(err, "Database not connected"));
};

export default db;