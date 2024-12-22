import NavBar from "./NavBar";
import ProductDetails from "./ProductDetails";
import Sneakers from "./Sneakers";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function HomePage() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-white"
    >
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <Sneakers />
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="lg:pt-12"
          >
            <ProductDetails />
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
