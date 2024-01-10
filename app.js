import { mongoose } from "mongoose";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";

//Create express app
const app = express();

//Import routes
import PropertiesRouter from "./src/routes/properties.route.js";

//Connect to database
mongoose
  .connect(
    "mongodb+srv://mongo_admin:Mon_Adm_1379@cluster0.vjqvsse.mongodb.net/telly?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database...");
  })
  .catch((e) => {
    console.log("Database connection failed...", e);
  });

  //Converts the _id filed to id
  mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    },
  });

// Log http requests
app.use(morgan("dev"));

//Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configure headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.status(200).json({});
  }
  next();
});

app.use("/src/images", express.static(path.join("./src/images")));

app.use("/properties", PropertiesRouter);

app.use("/", (req, res, next) => {
  res.status(200).json({ message: "telly web api" });
});

//export app
export default app;
