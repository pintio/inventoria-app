import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: __dirname + "/.env" });

import {
  checkCurrentUser,
  requireAuth,
} from "./src/middlewares/authMiddleware";

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// dotenv.config();
// dotenv.config({ path: __dirname + "/.env" });

const homeRoute = require("./src/routes/home");
const materialRouter = require("./src/routes/material.route");
const supplierRouter = require("./src/routes/supplier.route");
const userRouter = require("./src/routes/user.route");
const warehouseRouter = require("./src/routes/warehouse.route");
const categoryRouter = require("./src/routes/category.route");
const authRouter = require("./src/routes/auth.route");

const port = process.env.PORT || 5555;

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// checking if a user is logged in or not
// app.use(checkCurrentUser);

// protecting routes

// register(app);
// app.use("/", homeRoute);
app.use("/api/", requireAuth, checkCurrentUser, materialRouter);
app.use("/api/", requireAuth, checkCurrentUser, supplierRouter);
app.use("/api", requireAuth, checkCurrentUser, userRouter);
app.use("/api/", requireAuth, checkCurrentUser, warehouseRouter);
app.use("/api/", requireAuth, checkCurrentUser, categoryRouter);
app.use("/auth/", authRouter);

app.listen(port, () => {});
