require('dotenv').config()
const express = require("express");
const app = express();

const fileupload = require('express-fileupload'); 
const cors = require("cors");
const morgan = require("morgan");
const adminLoginRouter = require("./admin/adminLogin.router");
const adminRouter = require("./admin/admin.router");
const designsRouter = require("./designs/designs.router");
const imagesRouter = require("./images/images.router");
const contactsRouter = require("./contacts/contacts.router");
const featuresRouter = require("./features/features.router");


app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors());
app.use(fileupload({useTempFiles: true}))
app.use(express.json());
app.use(morgan("dev"));
app.use("/designs", designsRouter);
app.use("/contact", contactsRouter);
app.use("/images", imagesRouter);
app.use("/features", featuresRouter);
app.use("/login", adminLoginRouter);
app.use("/admin", adminRouter);
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
