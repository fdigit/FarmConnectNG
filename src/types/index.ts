export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'buyer' | 'admin';
  location: string;
  state: string;
  profilePicture?: string;
  created: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  images: string[];
  farmerId: string;
  farmerName: string;
  location: string;
  state: string;
  available: boolean;
  quantity: number;
  featured: boolean;
  rating: number;
  created: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Order {
  id: string;
  buyerId: string;
  farmerId: string;
  products: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  created: Date;
  updated: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  created: Date;
}