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
  const result = await Product.findById(productId);
  return result;
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
  console.log(`Searching for: ${searchTerm}`); // Debug log
  const result = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
      { 'variants.value': { $regex: regex } },
    ],
  });
  console.log(`Search result: ${result.length} items found`); // Debug log
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
