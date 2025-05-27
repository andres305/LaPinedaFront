import { useState } from 'react';
import API from '../services/api';
import { setToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/login', { email, password });
      setToken(res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3f2] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <div className="text-center mb-6">
          <LogIn className="mx-auto mb-2 text-[#6b1f31]" size={40} />
          <h2 className="text-3xl font-bold text-[#6b1f31]">Área Administrativa</h2>
          <p className="text-sm text-gray-500 mt-1">Solo personal autorizado</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6b1f31]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6b1f31]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-[#6b1f31] text-white py-3 rounded-xl font-semibold hover:bg-[#5a1829] transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
