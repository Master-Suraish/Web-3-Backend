import mongoose from "mongoose";
import { ProductTypes } from "../types/product-types";

const productSchema = new mongoose.Schema<ProductTypes>(
  {
    title: { type: String, required: true, unique: true },
    description: {
      type: String,
      required: true,
      minlength: 20,
    
      maxlength: 200,
    },
    price: { type: Number, required: true },
    quantity: { type: Number, min: 1, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ProductTypes>("Products", productSchema);
