import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header
      className={`fixed top-0 w-full z-50 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between transition-all duration-300 ${scrolled
          ? 'bg-[#6b1f31] shadow-md'
          : 'bg-transparent'
        }`}
    >
      {/* Logo */}
      <a href="#top">
        <img
          src="/assets/logo.jpg"
          alt="Logo La Pineda"
          className="h-10 md:h-12"
        />
      </a>

      {/* Menú escritorio */}
      <nav className="hidden md:flex gap-4 text-base lg:text-lg font-medium text-white">
        <a href="#restaurante" className="hover:underline">Restaurante</a>
        <a href="#bar" className="hover:underline">Bar</a>
        <a href="#habitaciones" className="hover:underline">Habitaciones</a>
      </nav>

      {/* Botón menú móvil */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white z-50 relative"
        aria-label="Abrir menú"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Panel lateral móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-[#6b1f31] text-white flex flex-col items-center justify-center gap-10 text-xl font-medium shadow-lg md:hidden"
          >
            <a href="#restaurante" onClick={toggleMenu}>Restaurante</a>
            <a href="#bar" onClick={toggleMenu}>Bar</a>
            <a href="#habitaciones" onClick={toggleMenu}>Habitaciones</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
