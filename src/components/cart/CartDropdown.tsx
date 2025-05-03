import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const CartDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cart, removeFromCart, updateQuantity } = useCart();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-slate-100 relative"
      >
        <ShoppingCart size={20} className="text-slate-600" />
        {cart.items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
            {cart.items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Shopping Cart</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {cart.items.length === 0 ? (
                <div className="p-4 text-center text-slate-500">
                  Your cart is empty
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-slate-500">
                            {item.farmerName}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-error-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            className="p-1 rounded-full hover:bg-slate-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            className="p-1 rounded-full hover:bg-slate-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-500">
                            ₦{item.price.toLocaleString()} per {item.unit}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.items.length > 0 && (
              <div className="p-4 border-t border-slate-200">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">₦{cart.total.toLocaleString()}</span>
                </div>
                <button className="btn btn-primary w-full">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;