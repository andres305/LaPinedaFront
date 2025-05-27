import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const transitionProps = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1],
};

const Home = () => {
  return (
    <div className="font-serif text-gray-800 scroll-smooth">
      <Header />

      {/* Hero */}
      <div
        id="top"
        className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center pt-20 px-4"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),url('/assets/hero.jpg')` }}
      >
        <motion.h1
          className="relative z-10 text-5xl md:text-7xl font-bold tracking-wide drop-shadow-xl"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ ...transitionProps }}
        >
          LA PINEDA
        </motion.h1>
        <motion.p
          className="relative z-10 mt-6 italic text-lg md:text-xl max-w-xl"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ ...transitionProps, delay: 0.4 }}
        >
          “Hospitalidad, cocina tradicional y descanso en un solo lugar”
        </motion.p>
      </div>

      {/* Restaurante */}
      <section id="restaurante" className="flex flex-col md:flex-row items-center bg-white py-16 px-6 md:px-20 gap-8 md:gap-12">
        <motion.img
          src="/assets/restaurante.jpg"
          alt="restaurante"
          className="w-full md:w-1/2 rounded shadow-lg"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={transitionProps}
        />
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={transitionProps}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#6b1f31]">RESTAURANTE</h2>
          <p className="text-base md:text-lg mb-4">
            Nuestra cocina une tradición y producto local. Disfruta de una carta elaborada con pasión y el sabor de siempre.
          </p>
          <a href="/carta" className="inline-block bg-[#6b1f31] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#551828] transition">
            Ver carta
          </a>
        </motion.div>
      </section>

      {/* Bar */}
      <section id="bar" className="flex flex-col md:flex-row-reverse items-center bg-[#6b1f31] text-white py-16 px-6 md:px-20 gap-8 md:gap-12">
        <motion.img
          src="/assets/bar.jpg"
          alt="bar"
          className="w-full md:w-1/2 rounded shadow-lg"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={transitionProps}
        />
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={transitionProps}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">BAR</h2>
          <p className="text-base md:text-lg">
            Un espacio acogedor donde podrás tomar algo, tapear o simplemente relajarte en buena compañía.
          </p>
        </motion.div>
      </section>

      {/* Habitaciones */}
      <section id="habitaciones" className="flex flex-col md:flex-row items-center bg-gray-100 py-16 px-6 md:px-20 gap-8 md:gap-12">
        <motion.img
          src="/assets/habitacion.jpg"
          alt="habitaciones"
          className="w-full md:w-1/2 rounded shadow-lg"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={transitionProps}
        />
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={transitionProps}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#6b1f31]">HABITACIONES</h2>
          <p className="text-base md:text-lg mb-4">
            Disponemos de habitaciones cómodas y tranquilas para una estancia perfecta en un entorno natural con vistas a la Sierra de Gredos.
          </p>
          <a href="/habitaciones" className="inline-block bg-[#6b1f31] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#551828] transition">
            Ver habitaciones
          </a>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
