import { useEffect, useState } from 'react';
import ProductsNavBar from '../../components/dashboard/ProductsNavBar';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import Pagination from '../../components/dashboard/Pagination';
import SkeletonLoader from '../../components/dashboard/SkeletonLoader';
import { Link } from 'react-router-dom';
import { getAllProperties } from '../../state/features/product/productService';
const deleteProduct = async (productId: any) => {
  return productId;
};
const Properties = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<any>('');
  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await deleteProduct(productId);
      if (response.status === 200) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error('Error deleting product', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsDeleteOpen(!isDeleteOpen);
      setDeleteProductId('');
    }
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProperties();
      if (response.status === 200) {
        setData(response.data.properties);
      } else {
        toast.error(
          response.message || 'An unexpected error occurred fetching properties'
        );
      }
    } catch (error: any) {
      console.error('Error fetching properties', error);
      toast.error(
        error.message || 'An unexpected error occurred fetching properties'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredData = data
    .filter((item: any) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: any, b: any) =>
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <Toaster richColors position="top-center" />
      <ProductsNavBar />
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Properties Management
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage your properties easily here.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
            className="border rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  #
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                  onClick={handleSort}
                >
                  Title {sortOrder === 'asc' ? '🔼' : '🔽'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  Price Per Night
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <SkeletonLoader rows={perPage} cols={6} />}
              {!loading && paginatedData.length > 0
                ? paginatedData.map((item: any, key) => (
                    <tr
                      key={key}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 whitespace-nowrap text-sm font-medium text-gray-800 relative">
                        {++key}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.title}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 w-64">
                        <div className="line-clamp-2 overflow-hidden">
                          {item?.description}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.pricePerNight}RWF
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                        <Link
                          to={`/dashboard/products/edit/${item?._id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-primary hover:bg-primary/10 transition-colors"
                        >
                          <FaEdit className="w-4 h-4 mr-1.5" />
                        </Link>
                        <button
                          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => {
                            setDeleteProductId(item._id);
                            setIsDeleteOpen(true);
                          }}
                        >
                          <FaTrash className="w-4 h-4 mr-1.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                : !loading && (
                    <tr>
                      <td
                        colSpan={2}
                        className="p-12 text-center text-gray-400"
                      >
                        📭 No products found
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
        <Pagination
          total={filteredData.length}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/90 rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Are you sure?
              </h3>
              <p className="text-gray-600 mb-6">
                You want to delete this product? This action is irreversible.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    handleDeleteProduct(deleteProductId);
                  }}
                  className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
