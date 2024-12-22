import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCart } from "@/context/CartContext";
import CartItems from "./CartItems";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import logo from '@/assets/logo.svg';
import avatar from '@/assets/image-avatar.png';


const navItems = [
  { label: "Collections", href: "#" },
  { label: "Men", href: "#" },
  { label: "Women", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function NavBar() {
  const { state } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center pb-6 border-b border-gray-200 my-6 w-[90%] max-w-7xl mx-auto">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={logo} alt="logo" className="h-8" />
        </motion.div>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600 z-50" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>

        <div
          className={`navItems ${
            isMobileMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-x-8`}
        >
          <ul
            className={`flex flex-col md:flex-row md:items-center gap-y-4 md:gap-y-0 md:gap-x-8 absolute top-0 left-0 right-0 bg-white w-[80%] mx-auto rounded-xl md:relative md:w-auto ${
              isMobileMenuOpen ? "mt-6" : ""
            }`}
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center py-4 md:p-0"
              >
                <a
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="profile hidden md:flex items-center gap-x-6">
          <Dialog>
            <DialogTrigger asChild>
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {state.cartItem?.quantity ?? 0}
                </motion.span>

                <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors" />
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
                <CartItems />
              </div>
            </DialogContent>
          </Dialog>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Avatar className="cursor-pointer border-2 border-transparent hover:border-orange-500 transition-colors">
              <AvatarImage src={avatar} alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
