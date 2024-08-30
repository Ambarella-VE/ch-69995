// server/models/product.model.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  stock: { type: Number, default: 0 },
  code: { type: String, required: true, unique: true }
});

productSchema.index({ code: 1 }, { unique: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
