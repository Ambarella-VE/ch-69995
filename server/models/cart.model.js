// server/models/cart.model.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

cartSchema.methods.calculateTotalPrice = function () {
  return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
