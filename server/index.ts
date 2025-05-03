import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../src/models/User';
import { Product } from '../src/models/Product';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.VITE_MONGODB_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, role, name, phone, address } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      name,
      phone,
      address,
    });

    // Remove password from response
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json({ user: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Remove password from response
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.json({ user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('farmer', 'name address')
      .sort({ createdAt: -1 });

    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/farmer', async (req, res) => {
  try {
    const farmerId = req.headers.authorization?.split(' ')[1];
    if (!farmerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const products = await Product.find({ farmer: farmerId })
      .sort({ createdAt: -1 });

    res.json({ products });
  } catch (error) {
    console.error('Error fetching farmer products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const farmerId = req.headers.authorization?.split(' ')[1];
    if (!farmerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const product = await Product.create({
      ...req.body,
      farmer: farmerId,
    });

    res.status(201).json({ product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const farmerId = req.headers.authorization?.split(' ')[1];
    if (!farmerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, farmer: farmerId },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const farmerId = req.headers.authorization?.split(' ')[1];
    if (!farmerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      farmer: farmerId,
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 