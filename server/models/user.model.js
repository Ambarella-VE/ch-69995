// server/models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true, index: true, validate: {
    validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: props => `${props.value} no es un correo válido!`
  }},
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
