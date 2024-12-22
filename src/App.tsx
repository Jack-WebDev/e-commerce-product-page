import { ToastContainer } from "react-toastify";
import HomePage from "./components/HomePage";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <ToastContainer />
      <HomePage />
    </CartProvider>
  );
}
