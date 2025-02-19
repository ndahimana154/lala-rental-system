import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#C2E0D1] text-[#295D42] py-4 shadow-lg flex items-center justify-between px-6">
      <motion.div
        className="flex items-center cursor-pointer"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
      >
        <FaHome className="text-3xl mr-2" />
        <h1 className="text-2xl font-bold">Lala Rentals</h1>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-[#295D42] text-white rounded-full hover:bg-[#1DCE5F] transition-colors"
        onClick={() => navigate('/login')}
      >
        Login
      </motion.button>
    </header>
  );
};

export default Header;
