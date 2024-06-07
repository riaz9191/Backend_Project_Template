import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (payload: TOrder) => {
  const order = new Order(payload);
  await order.save();
  return order;
};

const getAllOrders = async () => {
  const orders = await Order.find().populate('productId');
  return orders;
};

const getOrdersByEmail = async (email: string) => {
  const orders = await Order.find({ email }).populate('productId');
  return orders;
};
const getOrderById = async (orderId: string) => {
  try {
    const order = await Order.findById(orderId).populate('productId');
    return order;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
  getOrderById,
};
