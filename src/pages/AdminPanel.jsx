import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CategoryList from '../components/CategoryList';
import DishList from '../components/DishList';

const AdminPanel = () => {
  const [selectedSection, setSelectedSection] = useState('categories');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed left-0 top-0 h-full w-full max-w-xs sm:w-64 z-20">
        <Sidebar setSelectedSection={setSelectedSection} />
      </div>

      <div className="flex-1 p-8 ml-0 sm:ml-64">
        <h1 className="text-4xl font-bold mb-8 text-center">Panel de Administración</h1>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {selectedSection === 'categories' && <CategoryList />}
          {selectedSection === 'dishes' && <DishList />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
