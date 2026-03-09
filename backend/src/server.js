import express from "express";
import dotenv from "dotenv";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import { connectDB } from "./config/db.js";
import dns from "node:dns/promises";
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


dns.setServers(["1.1.1.1", "8.8.8.8"]);


app.use(cors());
app.use(express.json());


app.use("/attendance", attendanceRoutes);


app.get("/", (req, res) => {
  res.status(200).json("Attendance Server Running");
});


app.get("/attendence", (_, res) => res.redirect("/attendance"));


connectDB().then(() => {
  app.listen(port, () => {
    // console.log(` http://localhost:${port}/attendance`);
    console.log(`Listenting on port ${port}`);

  });
});
