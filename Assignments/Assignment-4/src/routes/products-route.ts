import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getByProductId,
  updateProduct,
} from "../controllers/products-controllers";

const route = Router();

route.get("/AllProducts", getAllProducts);
route.get("/Product/:id", getByProductId);
route.post("/CreateProduct", createNewProduct);
route.put("/UpdateProduct/:id", updateProduct);
route.delete("/DeleteProduct/:id", deleteProduct);

export default route;
