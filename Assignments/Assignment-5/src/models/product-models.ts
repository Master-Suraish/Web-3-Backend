import mongoose, { Schema } from "mongoose";
import { ProductTypes } from "../types/product-types";

const randomProductSchema = new Schema<ProductTypes>(
  {
    productName: {
      type: String,
      unique: true,
      minlength: 3,
      require: true,
      trim: true,
    },
    productId: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      min: 0,
      require: true,
    },
    productCategory: {
      type: String,
      require: true,
    },
    productInStock: {
      type: Boolean,
      require: true,
    },
    productQuantity: {
      type: Number,
      require: true,
    },
    productDescription: {
      type: String,
      require: true,
      minlength: 10,
    },
    // productRating: [Number],
    productRating: [
      {
        type: Number,
        min: 1,
        max: 5,
      },
    ],
    productReview: [
      {
        type: String,
        minlength: 10,
      },
    ],
    productDeletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<ProductTypes>(
  "RandomProducts",
  randomProductSchema
);
