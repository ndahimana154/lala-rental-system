import { useState } from 'react';
import ProductsNavBar from '../../components/dashboard/ProductsNavBar';
import { toast, Toaster } from 'sonner';
import { saveProperty } from '../../state/features/product/productService';

const NewProperty = () => {
  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!propertyName.trim()) newErrors.name = 'Property name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!pricePerNight.trim())
      newErrors.pricePerNight = 'Price per night is required';
    if (!location.trim()) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await saveProperty({
        title: propertyName,
        description,
        pricePerNight: parseInt(pricePerNight),
        location,
      });

      if (response.status === 201) {
        toast.success('Property created successfully');
        setIsSuccess(true);
        resetForm();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error('Error creating property:', error);
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  const resetForm = () => {
    setPropertyName('');
    setDescription('');
    setPricePerNight('');
    setLocation('');
    setErrors({});
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <Toaster richColors position="top-center" />
      <ProductsNavBar />

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Create Property</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Define a new property without images and other details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={propertyName}
                  onChange={(e) => {
                    setPropertyName(e.target.value);
                    setErrors((prev: any) => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  placeholder="e.g., Ocean View Villa"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prev: any) => ({
                      ...prev,
                      description: undefined,
                    }));
                  }}
                  rows={3}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  placeholder="Add a detailed description..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Night (RWF){' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={pricePerNight}
                    onChange={(e) => {
                      setPricePerNight(e.target.value);
                      setErrors((prev: any) => ({
                        ...prev,
                        pricePerNight: undefined,
                      }));
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.pricePerNight
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                    placeholder="Enter price per night"
                  />
                  {errors.pricePerNight && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pricePerNight}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setErrors((prev: any) => ({
                        ...prev,
                        location: undefined,
                      }));
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                    placeholder="Enter property location"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary text-white text-sm font-semibold py-3 px-6 rounded-xl hover:bg-primary-dark disabled:bg-gray-400"
            >
              Create Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProperty;
