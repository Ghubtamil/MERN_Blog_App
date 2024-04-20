import express from "express";
import mongoose from "mongoose";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

import path from 'path'
import { fileURLToPath } from "url";

// resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// use the client app
app.use(express.static(path.join(__dirname,'/client/dist')))

// render client for any path
app.get('*', (req,res) => res.sendFile(path.join(__dirname,'/client/dist/index.html')))

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("connected to DB successfully");
    app.listen(4000, "localhost", () => console.log("Listening to port 4000"));
  })
  .catch((err) => console.log(err));
