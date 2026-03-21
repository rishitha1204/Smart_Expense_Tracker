import mongoose from "mongoose";

import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://rishitha:rishitha1204@cluster0.z3itg7y.mongodb.net/expense_tracker?retryWrites=true&w=majority"
)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.log("Error:", err));
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;