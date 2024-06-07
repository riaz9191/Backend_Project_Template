import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;

  try {
    // Check product availability
    const product = await ProductServices.getProductById(orderData.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.inventory.quantity < orderData.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Create order
    const order = await OrderServices.createOrder(orderData);

    // Log before updating inventory
    console.log(`Before update: ${product.inventory.quantity}`);

    // Update product inventory
    product.inventory.quantity -= orderData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    // Log after updating inventory
    console.log(`After update: ${product.inventory.quantity}`);

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Could not create order!',
      error: err.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
      const { email } = req.query;
      if (email) {
        const result = await OrderServices.getOrdersByEmail(email as string);
        if (!result || result.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'Orders not found for the provided email',
          });
        }
        return res.status(200).json({
          success: true,
          message: `Orders fetched successfully for user email ${email}!`,
          data: result,
        });
      } else {
        const result = await OrderServices.getAllOrders();
        return res.status(200).json({
          success: true,
          message: 'Orders fetched successfully!',
          data: result,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: 'Could not fetch orders!',
        error: err.message,
      });
    }
  };
const getOrderById = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    try {
      const order = await OrderServices.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: order,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: 'Could not fetch order!',
        error: err.message,
      });
    }
  };
  
export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrderById,
  
};
