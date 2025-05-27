import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../components/Footer';
import Header2 from '../components/Header2';
import { getCategories, getDishes } from '../services/publicApi';

const CartaPublica = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories);
    getDishes().then(setDishes);
  }, []);

  const toggleCategory = (id) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="font-serif text-gray-800 scroll-smooth">
      <Header2 />

      <main className="pt-28 pb-16 px-4 md:px-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6b1f31]">
          Nuestra Carta
        </h2>

        {categories.map((cat) => {
          const catDishes = dishes.filter(dish => dish.categoryId === cat.id);

          return (
            <div key={cat.id} className="mb-6 border rounded shadow-sm overflow-hidden">
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 text-left font-semibold text-lg hover:bg-gray-200 transition"
              >
                {cat.name}
                {openCategory === cat.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              <AnimatePresence initial={false}>
                {openCategory === cat.id && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="bg-white border-t px-4 py-3 space-y-4"
                  >
                    {catDishes.length === 0 ? (
                      <p className="text-gray-500 italic">Sin platos disponibles.</p>
                    ) : (
                      catDishes.map((dish) => (
                        <div key={dish.id} className="border-b pb-3 last:border-none">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-lg">{dish.name}</span>
                            <span className="font-semibold text-[#6b1f31]">{dish.price} €</span>
                          </div>
                          {dish.description && (
                            <p className="text-sm text-gray-600 mt-1">{dish.description}</p>
                          )}
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
};

export default CartaPublica;
