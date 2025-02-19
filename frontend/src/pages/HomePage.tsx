import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/clients/Header';
import Footer from '../components/clients/Footer';
import { getActiveProperties } from '../state/features/product/productService';
import { FaMoneyBill } from 'react-icons/fa';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [propertiesData, setPropertiesData] = useState([]);

  const getProperties = async () => {
    try {
      const response = await getActiveProperties();
      setPropertiesData(response.data.properties);
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    getProperties();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEO title="Homepage: Lala Rentals" />
      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#C2E0D1] py-20 px-6"
      >
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold text-[#295D42] mb-6"
          >
            Discover Your Dream Property
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-xl text-[#329964] mb-8 max-w-2xl mx-auto"
          >
            Explore our curated selection of premium properties and find your
            perfect home.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-[#295D42] mb-12 text-center">
          Available Properties
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="h-60 bg-[#C2E0D1] animate-pulse" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-[#C2E0D1] rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-[#C2E0D1] rounded w-1/2 animate-pulse" />
                  </div>
                </motion.div>
              ))
            : propertiesData.map((property: any) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                  onClick={() => navigate(`/product/${property._id}`)}
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#295D42] mb-2">
                      {property.title}
                    </h3>

                    <div className="flex items-center space-x-4 text-[#329964] mb-4">
                      <div className="flex items-center space-x-2">
                        <FaMoneyBill />
                        <span>{property.pricePerNight} rwf</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-[#1DCE5F]">
                        {property.price}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-[#295D42] text-white rounded-full hover:bg-[#1DCE5F] transition-colors"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
