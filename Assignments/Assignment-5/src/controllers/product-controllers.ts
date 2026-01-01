import { Request, Response } from "express";
import productModel from "../models/product-models";

interface ProductReqBody {
  productName: string;
  productId: string;
  productPrice: number;
  productCategory: string;
  productInStock: boolean;
  productDescription: string;
  productQuantity: number;
  productRating?: number[];
  productReview?: string[];
  productDeletedAt: Date | null;
}

interface ProductPayloadTypes {
  productName?: string;
  productId?: string;
  productPrice?: number;
  productCategory?: string;
  productInStock?: boolean;
  productDescription?: string;
  productQuantity?: number;
  productRating?: number[];
  productReview?: string[];
  productDeletedAt?: Date | null;
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await productModel
      .find({ productDeletedAt: null })
      .sort({ createdAt: -1 })
      .select("-productDeletedAt");
    res.status(200).json({
      success: true,
      message: "Products lists fetched successfully!",
      data: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error " + error,
    });
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const oneProduct = await productModel
      .findOne({
        productId: req.params.productId,
        productDeletedAt: null,
      })
      .select("-productDeletedAt");

    if (!oneProduct) {
      res.status(404).json({
        success: false,
        message: "Sorry, Your requested product was not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Your requested product was founded.",
      data: oneProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error " + error,
    });
  }
};

export const createNewProduct = async (
  req: Request<{}, {}, ProductReqBody>,
  res: Response
) => {
  try {
    const {
      productId,
      productCategory,
      productInStock,
      productName,
      productPrice,
      productQuantity,
      productDescription,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }
    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }
    if (!productPrice) {
      return res.status(400).json({
        success: false,
        message: "Product price is required",
      });
    }
    if (!productQuantity) {
      return res.status(400).json({
        success: false,
        message: "Product quantity is required",
      });
    }
    if (!productInStock) {
      return res.status(400).json({
        success: false,
        message: "Product instock is required",
      });
    }
    if (!productCategory) {
      return res.status(400).json({
        success: false,
        message: "Product category is required",
      });
    }
    if (!productDescription) {
      return res.status(400).json({
        success: false,
        message: "Product description is required",
      });
    }

    // const createdProduct = new productModel(req.body);
    // const newProduct = await createdProduct.save();
    const newProduct = await productModel.create(req.body);

    const returnProduct = await productModel
      .findById(newProduct._id)
      .select("-productDeletedAt");

    res.status(200).json({
      success: true,
      message: "Your requested product created successfully!",
      data: returnProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error " + error,
    });
  }
};

export const updateProduct = async (
  req: Request<{ productId: string }, {}, ProductReqBody>,
  res: Response
) => {
  try {
    const isProductFound = await productModel.findOne({
      productId: req.params.productId,
      productDeletedAt: null,
    });

    // console.log(isProductFound);

    if (!isProductFound) {
      return res.status(404).json({
        success: false,
        message: "Sorry, Product not found maybe it's finished.",
      });
    }

    let updateProductPayload: ProductPayloadTypes = {};

    if (req.body.productCategory) {
      updateProductPayload.productCategory = req.body.productCategory;
    }
    if (req.body.productDescription) {
      updateProductPayload.productDescription = req.body.productDescription;
    }
    if (req.body.productPrice) {
      updateProductPayload.productPrice = req.body.productPrice;
    }
    if (req.body.productQuantity) {
      updateProductPayload.productQuantity = req.body.productQuantity;
    }
    if (req.body.productName) {
      updateProductPayload.productName = req.body.productName;
    }
    if (req.body.productId) {
      updateProductPayload.productId = req.body.productId;
    }
    if (req.body.productInStock) {
      updateProductPayload.productInStock = req.body.productInStock;
    }
    if (req.body.productRating) {
      updateProductPayload.productRating = req.body.productRating;
    }
    if (req.body.productReview) {
      updateProductPayload.productReview = req.body.productReview;
    }

    //* Note : findByIdAndUpdate() method works with mongodb id only this _id.
    //* findOneAndUpdate() methods works with any you want.

    const updatedProduct = await productModel
      .findOneAndUpdate(
        {
          productId: req.params.productId,
          productDeletedAt: null,
        },
        updateProductPayload,
        {
          new: true,
          runValidators: true,
        }
      )
      .select("-productDeletedAt");

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error " + error,
    });
  }
};

export const softDelProduct = async (
  req: Request<{ productId: string }>,
  res: Response
) => {
  try {
    const softDelProduct = await productModel.findOneAndUpdate(
      {
        productId: req.params.productId,
        productDeletedAt: null,
      },
      { productDeletedAt: new Date() },
      { new: true }
    );

    if (!softDelProduct) {
      return res.status(404).json({
        success: false,
        message: "Sorry, Product not found to deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your product deleted successfully!",
      data: softDelProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error " + error,
    });
  }
};

export const restoreSoftDelProduct = async (
  req: Request<{ productId: string }>,
  res: Response
) => {
  try {
    const restoreSoftDelProduct = await productModel.findOneAndUpdate(
      {
        productId: req.params.productId,
      },
      { productDeletedAt: null },
      { new: true }
    );

    if (!restoreSoftDelProduct) {
      return res.status(404).json({
        success: false,
        message: "Sorry, Your deleted Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your deleted product restore successfully!",
      data: restoreSoftDelProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error " + error,
    });
  }
};
