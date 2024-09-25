// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './config/passport.js';
import indexRoutes from './routes/index.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', indexRoutes);

// Database connection
const uri = 'mongodb://localhost:27017/ch-be-ii';
mongoose.connect(uri)
  .then(() => {
    console.log('DB Connection established');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
