import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import { connDatabase } from "./config/database.mjs";
import router from "./Routes/userRoutes.mjs";

//configure env
dotenv.config({ path: "./config/config.env" });

//database
connDatabase();
//rest object

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/user", router);

app.listen(process.env.PORT, () => {
  console.log(`server is running at port no.${process.env.PORT}`);
});
