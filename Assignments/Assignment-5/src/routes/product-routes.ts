import { Router } from "express";
import {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateProduct,
  softDelProduct,
  restoreSoftDelProduct
} from "../controllers/product-controllers";

const route = Router();

route.get("/Products", getAllProducts);
route.get("/Product/:productId", getOneProduct);
route.post("/Product/Create", createNewProduct);
route.put("/Product/Update/:productId", updateProduct);
route.delete("/Product/Delete/:productId", softDelProduct);
route.put("/Product/Restore/:productId", restoreSoftDelProduct);

export default route;
