import { useEffect, useState } from 'react';
import API from '../services/api';
import { Pencil, Trash2 } from 'lucide-react';
import Modal from './Modal';
import toast from 'react-hot-toast';

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]); // Nuevo estado para categorías
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, dishId: null, categoryId: null });

  useEffect(() => {
    fetchDishes();
    fetchCategories();
  }, []);

  const fetchDishes = async () => {
    try {
      const res = await API.get('/admin/dishes');
      const dishesWithCategory = res.data.map(dish => ({
        ...dish,
        categoryId: dish.categoryId ?? ''
      }));
      setDishes(dishesWithCategory);
    } catch (err) {
      console.error('Error al cargar platos:', err);
      toast.error('Error al cargar platos');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      toast.error('Error al cargar categorías');
    }
  };

  const confirmDeleteDish = (dishId, categoryId) => {
    setConfirmDelete({ open: true, dishId, categoryId });
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/categories/${confirmDelete.categoryId}/dishes/${confirmDelete.dishId}`);
      fetchDishes();
      toast.success('Plato eliminado');
    } catch {
      toast.error('Error al eliminar plato');
    } finally {
      setConfirmDelete({ open: false, dishId: null, categoryId: null });
    }
  };

  const handleEdit = (dish) => {
    setEditingDish(dish);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingDish?.categoryId || !editingDish?.id) {
      toast.error('Datos incompletos');
      return;
    }

    try {
      await API.put(`/categories/${editingDish.categoryId}/dishes/${editingDish.id}`, {
        name: editingDish.name,
        description: editingDish.description ?? '',
        price: editingDish.price ?? 0,
        visible: editingDish.visible ?? true
      });
      fetchDishes();
      setIsModalOpen(false);
      toast.success('Plato actualizado');
    } catch (err) {
      console.error('Error al actualizar plato:', err);
      toast.error('Error al actualizar plato');
    }
  };

  const toggleVisible = async (dish) => {
    try {
      await API.put(`/categories/${dish.categoryId}/dishes/${dish.id}`, {
        ...dish,
        visible: !dish.visible,
      });
      setDishes((prev) =>
        prev.map((d) =>
          d.id === dish.id ? { ...d, visible: !d.visible } : d
        )
      );
      toast.success(`Plato ${!dish.visible ? 'visible' : 'oculto'}`);
    } catch {
      toast.error('Error al cambiar visibilidad');
    }
  };

  const filtered = dishes.filter(dish =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  // Helper para obtener el nombre de la categoría
  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Sin categoría';
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar platos..."
          className="border p-2 rounded-xl w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Nombre</th>
            <th className="p-3">Descripción</th>
            <th className="p-3">Precio</th>
            <th className="p-3">Categoría</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[...filtered]
            .sort((a, b) => {
              // Ordena por nombre de categoría
              const catA = getCategoryName(a.categoryId).toLowerCase();
              const catB = getCategoryName(b.categoryId).toLowerCase();
              if (catA < catB) return -1;
              if (catA > catB) return 1;
              // Si la categoría es igual, ordena por nombre de plato
              return a.name.localeCompare(b.name);
            })
            .map((dish) => (
              <tr key={dish.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{dish.name}</td>
                <td className="p-3">{dish.description}</td>
                <td className="p-3">{dish.price} €</td>
                <td className="p-3">{getCategoryName(dish.categoryId)}</td>
                <td className="p-3">
                  <button
                    onClick={() => toggleVisible(dish)}
                    className={`px-3 py-1 rounded-xl text-white text-xs focus:outline-none transition-colors ${dish.visible
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-500 hover:bg-gray-600'
                      }`}
                  >
                    {dish.visible ? 'Visible' : 'Oculto'}
                  </button>
                </td>
                <td className="p-3 flex gap-2 justify-center items-center">
                  <button onClick={() => handleEdit(dish)} className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-xl">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => confirmDeleteDish(dish.id, dish.categoryId)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal edición */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Editar Plato">
        <input
          type="text"
          value={editingDish?.name ?? ''}
          onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
          className="w-full p-3 border rounded-xl mb-4"
          placeholder="Nombre"
        />
        <textarea
          value={editingDish?.description ?? ''}
          onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
          className="w-full p-3 border rounded-xl mb-4"
          placeholder="Descripción"
          rows={3}
        />
        <input
          type="number"
          value={editingDish?.price ?? ''}
          onChange={(e) => setEditingDish({ ...editingDish, price: parseFloat(e.target.value) })}
          className="w-full p-3 border rounded-xl mb-4"
          placeholder="Precio (€)"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded-xl">
            Cancelar
          </button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-xl">
            Guardar
          </button>
        </div>
      </Modal>

      {/* Modal de confirmación eliminación */}
      <Modal
        isOpen={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, dishId: null, categoryId: null })}
        title="Confirmar eliminación"
      >
        <p>¿Seguro que quieres eliminar este plato?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => setConfirmDelete({ open: false, dishId: null, categoryId: null })}
            className="bg-gray-300 text-black px-4 py-2 rounded-xl"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DishList;
