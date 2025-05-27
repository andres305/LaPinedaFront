import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#6b1f31] text-white py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">

        {/* Contacto */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-semibold mb-4">Contacto</h3>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} />
            <span>Carr. Soria - Plasencia, 48, 05600 El Barco de Ávila, Ávila</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Phone size={18} />
            <a href="tel:+34920340927" className="underline">+34 920 340 927</a>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Mail size={18} />
            <a href="mailto:hostal-lapineda@hotmail.com" className="underline">hostal-lapineda@hotmail.com</a>
          </div>
        </div>

        {/* Horarios */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-semibold mb-4">Horarios de cocina</h3>
          <div className="mb-4">
            <p className="font-semibold">Verano:</p>
            <p>13:00 - 16:00 / 20:30 - 22:30</p>
          </div>
          <div>
            <p className="font-semibold">Invierno:</p>
            <p>13:00 - 16:00 / 20:00 - 22:00</p>
          </div>
        </div>
      </div>

      {/* Línea final */}
      <div className="mt-10 text-center text-sm text-white/70">
        © {new Date().getFullYear()} La Pineda · Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
