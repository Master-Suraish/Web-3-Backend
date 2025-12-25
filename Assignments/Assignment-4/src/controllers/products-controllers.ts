import { Request, Response } from "express";
import productModel from "../models/product-models";

interface ProductReqBody {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string[];
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const productLists = await productModel.find();

    res.status(200).json({
      success: true,
      message: "All products data fetched successfully!",
      data: productLists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function getByProductId(
  req: Request<{ id: string }, {}, ProductReqBody>,
  res: Response
) {
  try {
    const product = await productModel.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Sorry,Product not found or maybe finished!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product founded successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function createNewProduct(
  req: Request<{}, {}, ProductReqBody>,
  res: Response
) {
  try {
    const { category, description, price, quantity, title } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Product category is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Product description is required",
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Product price is required",
      });
    }
    if (!quantity) {
      return res.status(400).json({
        success: false,
        message: "Product quantity is required",
      });
    }
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Product title is required",
      });
    }

    const product = new productModel(req.body);

    const newProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Congratulations! New product created successfully!",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function updateProduct(
  req: Request<{ id: string }, {}, ProductReqBody>,
  res: Response
) {
  try {
    const isProductFound = await productModel.findOne({ _id: req.params.id });

    if (!isProductFound) {
      return res.status(404).json({
        success: false,
        message: "Sorry, Product not found maybe it's finished.",
      });
    }

    let payload: any = {};

    if (req.body.category) {
      payload.category = req.body.category;
    }
    if (req.body.description) {
      payload.description = req.body.description;
    }
    if (req.body.price) {
      payload.price = req.body.price;
    }
    if (req.body.quantity) {
      payload.quantity = req.body.quantity;
    }
    if (req.body.title) {
      payload.title = req.body.title;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function deleteProduct(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: "Sorry, This ID name product not found in database.",
      });
    }
    res.status(200).json({
      message: "Product removed successfully!",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}
