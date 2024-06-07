import { Schema, model } from 'mongoose';
import { TOrder, TOrderModel } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Order = model<TOrder, TOrderModel>('Order', orderSchema);
