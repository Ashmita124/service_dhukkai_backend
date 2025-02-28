// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dbConfig = require("./config/dbConfig");
// const authRoutes = require("./services/authServices");
// const carRoutes = require("./services/carServices");
// const serviceRoutes = require("./services/car-washServices");
// const orderRoutes = require("./services/orderServices");
// const mechanicRoutes = require("./services/mechanicServices");
// const productRoutes = require("./services/car-products.js");

// var corsOptions = {
//   origin: "http://localhost:5000",
// };

// app.use(cors(corsOptions));

// mongoose
//   .connect(
//     `mongodb+srv://root:${dbConfig.PASSWORD}@learnmongodb.tuuzo.mongodb.net/${dbConfig.DBNAME}?retryWrites=true&w=majority`,
//     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
//   )
//   .catch((err) => {
//     console.log("Database Connection Error: " + err);
//   });
// let db = mongoose.connection;

// //To check Database Connection
// db.once("open", function () {
//   console.log("Connected to MongoDb Database");
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// //For preventing CORS ERRORS  (Postman is just a testing tool)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

// //Every request from admin route goes through this url : /admin
// app.use("/admin/auth", authRoutes);
// app.use("/admin/car-func", carRoutes);
// app.use("/admin/car-services", serviceRoutes);
// app.use("/admin/order", orderRoutes);
// app.use("/admin/mechanic", mechanicRoutes);
// app.use("/admin/car-products", productRoutes);

// //Server Side Error Handling
// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

// module.exports = app;


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const authRoutes = require("./services/authServices");
const carRoutes = require("./services/carServices");
const serviceRoutes = require("./services/car-washServices");
const orderRoutes = require("./services/orderServices");
const mechanicRoutes = require("./services/mechanicServices");
const productRoutes = require("./services/car-products");

// ✅ Improved CORS Configuration
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

// ✅ API Routes
app.use("/admin/auth", authRoutes);
app.use("/admin/car-func", carRoutes);
app.use("/admin/car-services", serviceRoutes);
app.use("/admin/order", orderRoutes);
app.use("/admin/mechanic", mechanicRoutes);
app.use("/admin/car-products", productRoutes);

// ✅ Error Handling for 404
app.use((req, res, next) => {
  const error = new Error("❌ Route Not Found");
  error.status = 404;
  next(error);
});

// ✅ Global Error Handling
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: { message: error.message },
  });
});

module.exports = app;
