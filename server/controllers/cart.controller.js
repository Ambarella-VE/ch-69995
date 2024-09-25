// server/controllers/cart.controller.js
import CartDAO from '../dao/cart.dao.js';
import ProductDAO from '../dao/product.dao.js';
import TicketDAO from '../dao/ticket.dao.js';
import { v4 as uuidv4 } from 'uuid';
const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartDAO.findById(cid);
    const unavailableProducts = [];

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Lógica de compra
    for (const item of cart.products) {
      const product = await ProductDAO.findById(item.productId);

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();
      } else {
        unavailableProducts.push(item.productId);
      }
    }

    // Si hay productos no disponibles
    if (unavailableProducts.length) {
      return res.status(400).json({
        message: 'Some products were unavailable for purchase',
        unavailableProducts,
      });
    }

    // Datos del ticket
    const ticketData = {
      code: generateUniqueCode(),
      amount: calculateTotal(cart),
      purchaser: req.user.email,
      purchase_datetime: new Date(),
    };

    const ticket = await TicketDAO.create(ticketData);
    res.json({ ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error during purchase', error });
  }
};

// Función para generar un código único para el ticket
const generateUniqueCode = () => {
  return uuidv4();
};

// Función para calcular el total de la compra
const calculateTotal = (cart) => {
  return cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export { purchaseCart };
