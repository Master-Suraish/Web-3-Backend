import z from "zod";

export const ProductBodyZodSchema = z.object({
  productName: z
    .string()
    .min(3, "Length must be three or more character")
    .trim(),
  productId: z.string().trim(),
  productPrice: z.number().min(0, "Price should not be zero or below"),
  productCategory: z.string(),
  productInStock: z.boolean(),
  productQuantity: z.number(),
  productDescription: z.string(),
  productRating: z.array(
    z
      .number()
      .min(1, "Product min rating is 1")
      .max(5, "Product max rating is 5")
  ),
  productReview: z.array(
    z
      .string()
      .min(10, "Product review is min 10 charactors long")
      .max(200, "Product review is max 200 charactor")
  ),
});
