const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const orderRoutes = require("./services/orderServices");

/*
Via Express routes, HTTP request that matches a route will be checked by 
CORS Middleware before coming to Security layer
*/
const corsOptions = {
  origin: "http://localhost:3001", // Adjust if needed

};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ Updated MongoDB Connection
const MONGO_URI = `mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@cluster0.mrzdi.mongodb.net/${dbConfig.DBNAME}?retryWrites=true&w=majority`

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

let db = mongoose.connection;

// ✅ To Check Database Connection
db.once("open", () => {
  console.log("✅ MongoDB Database Connection Established!");
});

// ✅ CORS Middleware for Security
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use("/order", orderRoutes);

//Server Side Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
