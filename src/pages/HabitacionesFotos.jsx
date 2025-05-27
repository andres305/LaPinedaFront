import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import Header2 from '../components/Header2';

const HabitacionesFotos = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const images = [
    '/assets/habitacion1.jpg',
    '/assets/habitacion2.jpg',
    '/assets/habitacion3.jpg',
    '/assets/habitacion4.jpg',
    '/assets/habitacion5.jpg',
    '/assets/habitacion6.jpg',
  ];

  return (
    <div className="font-serif text-gray-800">
      <Header2 />

      <main className="pt-28 px-6 md:px-20 max-w-6xl mx-auto pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#6b1f31] mb-12">
          Galería de Habitaciones
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Habitación ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImg(src)}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedImg && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
            >
              <motion.img
                src={selectedImg}
                alt="Habitación ampliada"
                className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={e => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default HabitacionesFotos;
