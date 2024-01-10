import { Double } from "mongodb";
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  /* user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }, */
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  images: {
    type: [String],
    required: true,
  },
  includes: {
    wifi: {
      type: Boolean,
      required: true,
    },
    entertainment: {
      type: Boolean,
      required: true,
    },
    sportsFacilities: {
      type: Boolean,
      required: true,
    },
    catering: {
      type: Boolean,
      required: true,
    },
    bar: {
      type: Boolean,
      required: true,
    },
  }
});

const Property = mongoose.model("property", PropertySchema);

export default Property;
