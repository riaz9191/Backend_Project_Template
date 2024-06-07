import { Model, Types } from 'mongoose';

export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export type TOrderModel = Model<TOrder>;
