import express from "express";
import dotenv from "dotenv";
import ViteExpress from "vite-express";

import routes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
