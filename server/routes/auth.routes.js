// server/routes/auth.routes.js
import express from 'express';
import User from '../models/user.model.js';
import cookieParser from 'cookie-parser';

const router = express.Router();

router.use(cookieParser());

// Ruta para registro de usuario
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Ruta para registro de usuarios en bulk
router.post('/register/bulk', async (req, res) => {
  const users = req.body.users;

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: 'No users provided' });
  }

  try {
    const result = await User.insertMany(users);
    res.status(201).json({ message: 'Users created successfully', response: result });
  } catch (error) {
    res.status(500).json({ message: 'Error creating users', error });
  }
});

// Ruta para login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.cookie('user', JSON.stringify({ email: user.email, role: user.role }), { httpOnly: true });
  res.json({ message: 'Login successful' });
});

// Ruta para logout de usuario
router.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.json({ message: 'Logout successful' });
});

export default router;