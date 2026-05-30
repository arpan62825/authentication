import express from "express";
import dotenv from "dotenv";

//-------
import { connectToDB } from "./database/connectToDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`Listening on port ${process.env.PORT}`);
});
