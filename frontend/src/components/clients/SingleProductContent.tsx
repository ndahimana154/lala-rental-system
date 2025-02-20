import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  bookProperty,
  getSingleProperty,
} from '../../state/features/product/productService';
import { toast, Toaster } from 'sonner';

function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    names: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getSingleProperty(id);
        setProperty(response.data.property);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const bookingData = {
        property: id,
        guest: {
          names: formData.names,
          email: formData.email,
          phone: formData.phone,
        },
        checkInDate: new Date(formData.checkIn),
        checkOutDate: new Date(formData.checkOut),
      };

      const response = await bookProperty(bookingData);

      if (response.status === 201) {
        toast.success('Booking submitted successfully');
        setFormData({
          checkIn: '',
          checkOut: '',
          names: '',
          email: '',
          phone: '',
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error submitting booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#295D42] text-2xl">
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center text-red-600 text-2xl py-10">
        Property not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Toaster richColors position="top-center" />

      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-xl rounded-2xl">
          <h2 className="text-4xl font-bold mt-4 text-[#295D42]">
            {property.title}
          </h2>
          <p className="text-gray-700 mt-2 text-lg">{property.description}</p>
          <p className="text-2xl font-semibold mt-4 text-[#1DCE5F]">
            Price: {property.pricePerNight} RWF / night
          </p>
          <p className="text-md mt-2 text-[#329964] font-medium">
            Location: {property.location}
          </p>
          <p className="text-md mt-1 text-[#1DCE5F]">
            Status: {property.status === 'active' ? 'Available' : 'Unavailable'}
          </p>
          <button
            className="mt-6 w-full bg-[#295D42] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#1DCE5F] transition duration-300"
            onClick={() => setShowBookingForm(true)}
          >
            Book Now
          </button>

          {showBookingForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-6 bg-gray-100 p-6 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Booking Details</h3>
              <label className="block mb-2">Check-in Date:</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <label className="block mb-2">Check-out Date:</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <label className="block mb-2">Full Name:</label>
              <input
                type="text"
                name="names"
                value={formData.names}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <label className="block mb-2">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#295D42] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#1DCE5F] transition duration-300"
              >
                Submit Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyPage;
