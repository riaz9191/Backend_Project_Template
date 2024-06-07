import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await ProductServices.createProduct(productData);

  res.json({
    success: true,
    message: "Product created successfully!",
    data: result,
  });
};

const getAllProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  if (searchTerm) {
    const result = await ProductServices.searchProducts(searchTerm as string);
    return res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result,
    });
  } else {
    const result = await ProductServices.getAllProducts();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.getProductById(productId);

  res.status(200).json({
    success: true,
    message: "Product fetched successfully!",
    data: result,
  });
};

const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const productData = req.body;
  const result = await ProductServices.updateProduct(productId, productData);

  res.status(200).json({
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  await ProductServices.deleteProduct(productId);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully!",
    data: null,
  });
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
