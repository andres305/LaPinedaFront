import { useEffect, useState } from 'react';
import API from '../services/api';
import { Pencil, Trash2 } from 'lucide-react';
import Modal from './Modal';
import toast from 'react-hot-toast';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, categoryId: null });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get('/categories');
    setCategories(res.data);
  };

  const confirmDeleteCategory = (categoryId) => {
    setConfirmDelete({ open: true, categoryId });
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/categories/${confirmDelete.categoryId}`);
      fetchCategories();
      toast.success('Categoría eliminada');
    } catch {
      toast.error('Error al eliminar categoría');
    } finally {
      setConfirmDelete({ open: false, categoryId: null });
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await API.put(`/categories/${editingCategory.id}`, {
        name: editingCategory.name,
        visible: editingCategory.visible ?? true,
      });
      fetchCategories();
      setIsModalOpen(false);
      toast.success('Categoría actualizada');
    } catch {
      toast.error('Error al actualizar categoría');
    }
  };

  const toggleVisible = async (cat) => {
    try {
      await API.put(`/categories/${cat.id}`, {
        ...cat,
        visible: !cat.visible,
      });
      setCategories((prev) =>
        prev.map((c) =>
          c.id === cat.id ? { ...c, visible: !c.visible } : c
        )
      );
      toast.success(`Categoría ${!cat.visible ? 'visible' : 'oculta'}`);
    } catch {
      toast.error('Error al cambiar visibilidad');
    }
  };

  const filtered = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar categorías..."
          className="border p-2 rounded-xl w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Nombre</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[...filtered]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{cat.name}</td>
                <td className="p-3">
                  <button
                    onClick={() => toggleVisible(cat)}
                    className={`px-3 py-1 rounded-xl text-white text-xs focus:outline-none transition-colors ${cat.visible ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                  >
                    {cat.visible ? 'Visible' : 'Oculto'}
                  </button>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(cat)} className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-xl">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => confirmDeleteCategory(cat.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal edición */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Editar Categoría">
        <input
          type="text"
          value={editingCategory?.name || ''}
          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
          className="w-full p-3 border rounded-xl mb-4"
          placeholder="Nombre"
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
        onClose={() => setConfirmDelete({ open: false, categoryId: null })}
        title="Confirmar eliminación"
      >
        <p>¿Seguro que quieres eliminar esta categoría?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => setConfirmDelete({ open: false, categoryId: null })}
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

export default CategoryList;
