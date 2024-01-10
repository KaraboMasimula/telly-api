import express from "express";
import Property from "../models/properties.schema.js";
import upload from "../middleware/fileupload.js";

const PropertiesRouter = express.Router();

PropertiesRouter.get("/", (req, res, next) => {
  Property.find()
    .then((results) => {
      res.status(201).send({
        message: "Properties fetched successfuly",
        data: results,
      });
    })
    .catch((error) => {
      console.log("Error => " + error);

      res.status(400).send({
        message: "Error fetching properties...",
        error: error,
      });
    });
});

PropertiesRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Property.findOne({_id:id})
    .then((results) => {
      res.status(201).send({
        message: "Property fetched successfuly",
        data: results,
      });
    })
    .catch((error) => {
      console.log("Error => " + error);

      res.status(400).send({
        message: "Error fetching properties...",
        error: error,
      });
    });
});

PropertiesRouter.post("/", upload, (req, res, next) => {
  const { title, description, type, address, includes} = JSON.parse(req.body.data);

  const url = req.protocol + "://" + req.get("host");

  let images = [];
  let files = req.files;

  // loop through files if they exist within the request body
  if (files) {
    files.forEach((file) => {
      images.push(`${url}/${file.path}`);
    });
  }

  //Initializing stars and rating
    let stars = 0;
    let rating = 0;

  let newProperty = new Property({
    title,
    description,
    type,
    address,
    images,
    stars,
    rating,
    includes
  });
  newProperty
    .save()
    .then((results) => {
      res.status(201).send({
        message: "Property saved successfuly",
        data: results,
      });
    })
    .catch((error) => {
      console.log("Error => " + error);

      res.status(400).send({
        message: "Failed...",
        error: error,
      });
    });

    /* res.status(200).send("HI") */
});

export default PropertiesRouter;
