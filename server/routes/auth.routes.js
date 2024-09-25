// server/routes/auth.routes.js
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import cookieParser from 'cookie-parser';
import { JWT_SECRET } from '../config/config.js';

const router = express.Router();

router.use(cookieParser());

// Ruta para registro de usuario
router.post('/register', async (req, res) => {
  const { email, password, role, first_name, last_name, age } = req.body;

  if (!email || !password || !first_name || !last_name || !age) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const user = new User({ email, password, role, first_name, last_name, age });
    await user.save();
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
});

// Ruta para registro de usuarios en bulk
router.post('/register/bulk', async (req, res) => {
  const users = req.body.users;

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron usuarios' });
  }

  try {
    const result = await User.insertMany(users);
    res.status(201).json({ message: 'Usuarios creados exitosamente', response: result });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuarios', error });
  }
});

// Ruta para login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Email o contraseña inválidos' });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Email o contraseña inválidos' });
  }

  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  res.cookie('user', JSON.stringify({ email: user.email, role: user.role }), { httpOnly: true });
  res.json({ message: 'Login exitoso', token, user: { email: user.email, role: user.role } });
});

// Ruta para logout de usuario
router.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.json({ message: 'Logout exitoso' });
});

// Ruta para obtener datos del usuario logueado
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Usuario actual', user: req.user });
});

export default router;
