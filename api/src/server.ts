import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import "./auth/oauthSetup";

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(protectedRoutes);

createConnection()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));
