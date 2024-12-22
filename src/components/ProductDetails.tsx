import { useState } from "react";
import { CartItem, useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetails() {
  const [count, setCount] = useState(0);
  const { state, dispatch } = useCart();

  const product: CartItem = {
    name: "Fall Limited Edition Sneakers",
    price: 230,
    quantity: count,
    image: "sneaker.jpg",
  };

  const addToCart = () => {
    if (count === 0) return;
    
    const existingItem = state.cartItem;
    if (existingItem) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { quantity: count },
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: product,
      });
    }
  };

  const addItem = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const removeItem = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto p-6 space-y-6"
    >
      <div className="space-y-4">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-orange-500 font-bold tracking-wider text-sm"
        >
          SNEAKER COMPANY
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-gray-900"
        >
          Fall Limited Edition Sneakers
        </motion.h2>

        <p className="text-gray-600 leading-relaxed">
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything the
          weather can offer.
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">R230</span>
            <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded font-bold">
              50%
            </span>
          </div>
          <p className="text-gray-400 line-through">R345</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 w-36">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={removeItem}
            className="p-2 text-orange-500 hover:text-orange-600"
          >
            <Minus className="w-4 h-4" />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-bold text-lg"
            >
              {count}
            </motion.span>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={addItem}
            className="p-2 text-orange-500 hover:text-orange-600"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addToCart}
          disabled={count === 0}
          className={`w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg 
            shadow-orange-500/30 flex items-center justify-center gap-2 transition-colors
            ${count === 0 ? 'cursor-not-allowed' : 'hover:bg-orange-600'}`}
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}