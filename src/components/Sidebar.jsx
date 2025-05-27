import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Modal from './Modal';
import API from '../services/api';
import { removeToken } from '../services/auth';

const listVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: 'easeInOut',
      when: 'beforeChildren',
      staggerChildren: 0.07,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: 'easeInOut',
      when: 'afterChildren',
    },
  },
};

const itemVariants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  closed: { opacity: 0, y: -20, transition: { duration: 0.15 } },
};

const Sidebar = ({ setSelectedSection, onDishCreated }) => {
  const [openCategories, setOpenCategories] = useState(false);
  const [openDishes, setOpenDishes] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isDishModalOpen, setDishModalOpen] = useState(false);
  const [dishForm, setDishForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    visible: true,
  });
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isDishModalOpen) {
      API.get('/admin/categories')
        .then((res) => setCategories(res.data))
        .catch(() => toast.error('Error al cargar categorías'));
    }
  }, [isDishModalOpen]);

  const handleCreateCategory = async () => {
    if (!categoryName) return toast.error('El nombre es obligatorio');

    try {
      await API.post('/categories', { name: categoryName, visible: true });
      toast.success('Categoría creada');
      setCategoryModalOpen(false);
      setCategoryName('');
    } catch {
      toast.error('Error al crear categoría');
    }
  };

  const handleCreateDish = async () => {
    const { name, description, price, categoryId, visible } = dishForm;

    if (!name || !price || !categoryId) {
      return toast.error('Todos los campos son obligatorios');
    }

    try {
      const res = await API.post(`/categories/${categoryId}/dishes`, {
        name,
        description,
        price: parseFloat(price),
        visible,
      });
      toast.success('Plato creado');
      if (onDishCreated) onDishCreated(res.data);
      setDishForm({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        visible: true,
      });
      setDishModalOpen(false);
    } catch {
      toast.error('Error al crear plato');
    }
  };

  const handleLogout = () => {
    removeToken();
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen px-4 py-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Admin</h2>

        {/* Categorías */}
        <div className="mb-4">
          <button
            className="flex items-center w-full justify-between text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded-xl"
            onClick={() => setOpenCategories(!openCategories)}
          >
            Categorías {openCategories ? <ChevronDown /> : <ChevronRight />}
          </button>
          <AnimatePresence>
            {openCategories && (
              <motion.div
                className="ml-4 mt-2 flex flex-col space-y-2 overflow-hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={listVariants}
              >
                <motion.button
                  variants={itemVariants}
                  onClick={() => setSelectedSection('categories')}
                  className="text-left hover:bg-gray-700 px-3 py-2 rounded-lg"
                >
                  Listado
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  onClick={() => setCategoryModalOpen(true)}
                  className="text-left hover:bg-gray-700 px-3 py-2 rounded-lg"
                >
                  Nueva categoría
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Platos */}
        <div>
          <button
            className="flex items-center w-full justify-between text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded-xl"
            onClick={() => setOpenDishes(!openDishes)}
          >
            Platos {openDishes ? <ChevronDown /> : <ChevronRight />}
          </button>
          <AnimatePresence>
            {openDishes && (
              <motion.div
                className="ml-4 mt-2 flex flex-col space-y-2 overflow-hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={listVariants}
              >
                <motion.button
                  variants={itemVariants}
                  onClick={() => setSelectedSection('dishes')}
                  className="text-left hover:bg-gray-700 px-3 py-2 rounded-lg"
                >
                  Listado
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  onClick={() => setDishModalOpen(true)}
                  className="text-left hover:bg-gray-700 px-3 py-2 rounded-lg"
                >
                  Nuevo plato
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-10">
        <hr className="my-6 border-gray-700" />
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Modal Nueva Categoría */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        title="Nueva Categoría"
      >
        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded-xl mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setCategoryModalOpen(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateCategory}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              Crear
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Nuevo Plato */}
      <Modal
        isOpen={isDishModalOpen}
        onClose={() => setDishModalOpen(false)}
        title="Nuevo Plato"
      >
        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6 space-y-4">
          <input
            type="text"
            placeholder="Nombre del plato"
            name="name"
            value={dishForm.name}
            onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
            className="w-full p-2 border rounded-xl"
          />

          <select
            name="categoryId"
            value={dishForm.categoryId}
            onChange={(e) => setDishForm({ ...dishForm, categoryId: e.target.value })}
            className="w-full p-2 border rounded-xl"
          >
            <option value="">Selecciona una categoría</option>
            {[...categories]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>

          <textarea
            placeholder="Descripción"
            name="description"
            value={dishForm.description}
            onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
            className="w-full p-2 border rounded-xl"
            rows={3}
          />

          <input
            type="number"
            placeholder="Precio (€)"
            name="price"
            value={dishForm.price}
            onChange={(e) => setDishForm({ ...dishForm, price: e.target.value })}
            className="w-full p-2 border rounded-xl"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={dishForm.visible}
              onChange={(e) => setDishForm({ ...dishForm, visible: e.target.checked })}
            />
            Visible
          </label>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={() => setDishModalOpen(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateDish}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              Crear
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
