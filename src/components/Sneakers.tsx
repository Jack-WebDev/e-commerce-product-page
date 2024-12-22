import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import product1Image from "@/assets/image-product-1.jpg";
import product2Image from "@/assets/image-product-2.jpg";
import product3Image from "@/assets/image-product-3.jpg";
import product4Image from "@/assets/image-product-4.jpg";
import productThumbnail1 from "@/assets/image-product-1-thumbnail.jpg";
import productThumbnail2 from "@/assets/image-product-2-thumbnail.jpg";
import productThumbnail3 from "@/assets/image-product-3-thumbnail.jpg";
import productThumbnail4 from "@/assets/image-product-4-thumbnail.jpg";

const images = [
  {
    thumbnail: productThumbnail1,
    desktop: product1Image,
  },
  { thumbnail: productThumbnail2, desktop: product2Image },
  { thumbnail: productThumbnail3, desktop: product3Image },
  { thumbnail: productThumbnail4, desktop: product4Image },
];

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

const slideIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { type: "spring", stiffness: 300, damping: 30 },
};

export default function Sneakers() {
  const [selectedImage, setSelectedImage] = useState(images[0].desktop);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openDialog = (index: number) => {
    setCurrentIndex(index);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const showPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <motion.div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.img
          src={selectedImage}
          alt="Selected"
          className="w-full h-auto cursor-pointer rounded-xl"
          onClick={() =>
            openDialog(images.findIndex((img) => img.desktop === selectedImage))
          }
          layoutId="main-image"
        />
      </motion.div>

      <div className="flex space-x-4">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(image.desktop)}
            className={`p-1 rounded-xl overflow-hidden ${
              selectedImage === image.desktop
                ? "ring-2 ring-primary ring-offset-2"
                : ""
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={image.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg"
              whileHover={{ opacity: 0.8 }}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
            {...fadeIn}
          >
            <motion.div
              className="relative w-full max-w-4xl flex items-center px-12"
              {...slideIn}
            >
              <motion.button
                onClick={showPrevious}
                className="absolute left-0 p-3 bg-white rounded-full shadow-lg focus:outline-none hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.img
                key={currentIndex}
                src={images[currentIndex].desktop}
                alt="Carousel"
                className="w-full max-h-[80vh] object-contain rounded-2xl"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              <motion.button
                onClick={showNext}
                className="absolute right-0 p-3 bg-white rounded-full shadow-lg focus:outline-none hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              <motion.button
                onClick={closeDialog}
                className="absolute top-4 right-0 p-3 bg-white rounded-full shadow-lg focus:outline-none hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
