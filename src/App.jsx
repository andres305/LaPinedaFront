import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import CartaPublica from './pages/CartaPublica';
import CategoryList from './components/CategoryList';
import DishList from './components/DishList';
import Login from './pages/Login';
import Home from './pages/Home';
import { isAuthenticated, isAdmin } from './services/auth';
import HabitacionesFotos from './pages/HabitacionesFotos';

function ProtectedAdminRoute({ children }) {
  if (!isAuthenticated()) return <Navigate to="/" />;
  if (!isAdmin()) return <Navigate to="/" />;
  return children;
}


function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas pública */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carta" element={<CartaPublica />} />
        <Route path="/habitaciones" element={<HabitacionesFotos />} />

        {/* Rutas protegidas */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute>
              <CategoryList />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/dishes"
          element={
            <ProtectedAdminRoute>
              <DishList />
            </ProtectedAdminRoute>
          }
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
