import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header2 = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-[#6b1f31] shadow-md' : 'bg-transparent'
      }`}
    >
      {/* Logo a la izquierda */}
      <Link to="/" className="flex items-center gap-4">
        <img src="/assets/logo.png" alt="Logo La Pineda" className="h-10 md:h-12" />
      </Link>

      {/* Nombre a la derecha */}
      <Link
        to="/"
        className="text-2xl md:text-3xl font-bold tracking-wide text-black"
      >
        La Pineda
      </Link>
    </header>
  );
};

export default Header2;
