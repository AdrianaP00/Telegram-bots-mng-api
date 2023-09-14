import express from "express";
import dotenv from "dotenv";
import { connect } from "./utils/db";
import userRouter from "./api/routes/UserRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connect();

app.use(express.json());
app.use("/user", userRouter)

app.listen(PORT, () => console.log(`Listening at port: ${PORT}`));
