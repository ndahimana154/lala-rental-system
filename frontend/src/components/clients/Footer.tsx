import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#C2E0D1] text-[#295D42] py-8 text-center">
      <p className="text-lg font-semibold">
        &copy; {new Date().getFullYear()} Lala Rentals. All rights reserved.
      </p>
      <p className="mt-2">
        Contact: info@lalarentals.com | Phone: (123) 456-7890
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-6 py-2 bg-[#295D42] text-white rounded-full hover:bg-[#1DCE5F] transition-colors"
        onClick={() => navigate('/login')}
      >
        Login
      </motion.button>
    </footer>
  );
};

export default Footer;
