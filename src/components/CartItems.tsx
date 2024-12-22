import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function CartItems() {
  const { state, dispatch } = useCart();

  const totalAmount = state.cartItem
    ? state.cartItem.price * state.cartItem.quantity
    : 0;

  const removeItem = () => {
    dispatch({
      type: "REMOVE_ITEM",
    });
  };

  const handleCheckout = () => {
    dispatch({
      type: "CLEAR_CART",
    });
    toast.success("Checkout Successful");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-6 pb-2 border-b">Your Cart</h1>

      <AnimatePresence mode="wait">
        {state.cartItem ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h2 className="font-medium text-lg">{state.cartItem.name}</h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Quantity: {state.cartItem.quantity}</p>
                    <p>Price: R{state.cartItem.price.toFixed(2)}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={removeItem}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount</span>
                <span className="text-lg font-semibold">
                  R{totalAmount.toFixed(2)}
                </span>
              </div>

              <Button 
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-8 text-gray-500 space-y-4"
          >
            <ShoppingBag className="w-12 h-12" />
            <p className="text-center">Your cart is empty</p>
            <p className="text-sm text-gray-400">Add items to get started</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}