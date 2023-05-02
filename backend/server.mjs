import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import { connDatabase } from "./config/database.mjs";
import router from "./Routes/userRoutes.mjs";
import adminrouter from "./Routes/adminRoutes.mjs";
import doctorrouter from "./Routes/doctorRoutes.mjs";

//configure env
dotenv.config({ path: "./config/config.env" });

//database
connDatabase();
//rest object

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes

app.use("/api/v1/user", router);
app.use("/api/v1/admin", adminrouter);
app.use("/api/v1/doctor", doctorrouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running at port no.${process.env.PORT}`);
});
