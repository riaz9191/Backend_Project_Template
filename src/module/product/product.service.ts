import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: TProduct) => {
  const result = new Product(payload);
  await result.save();
  return result;
};

const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

const getProductById = async (productId: string) => {
  try {
    const result = await Product.findById(productId);
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

const updateProduct = async (productId: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(productId, payload, { new: true });
  return result;
};

const deleteProduct = async (productId: string) => {
  await Product.findByIdAndDelete(productId);
};

const searchProducts = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i'); // 'i' makes it case-insensitive
  const result = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
      { 'variants.value': { $regex: regex } },
    ],
  });
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};
