import { Model } from 'mongoose';

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TVariant = {
  type: string;
  value: string;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
  slug: string;
};

// Put all product instance methods in this interface:
export type TProductMethods = {
  createSlug(payload: TProduct): string;
};

export type TProductModel = Model<TProduct, Record<string, unknown>, TProductMethods>;
