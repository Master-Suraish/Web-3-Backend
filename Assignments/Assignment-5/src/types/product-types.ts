import { Document } from "mongoose";

export interface ProductTypes extends Document {
  productName: string;
  productId: string;
  productPrice: number;
  productCategory: string;
  productInStock: boolean;
  productQuantity: number;
  productDescription: string;
  productRating?: number[];
  productReview?: string[];
  productDeletedAt: Date | null;
}
