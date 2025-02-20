import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import SingleProduct from './pages/SingleProduct';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardProducts from './pages/dashboard/Products';
import ProtectedRoute from './components/dashboard/ProtectedRoute';
import AdminRoute from './components/dashboard/AdminRoute';
import TechnicianRoute from './components/dashboard/TechnicianRoute';
import Profile from './pages/dashboard/Profile';
import AdminViewUsers from './pages/dashboard/AdminViewUsers';
import NewUser from './pages/dashboard/NewUser';
import Chats from './pages/dashboard/Chats';
import Logout from './components/dashboard/Logout';
import NewProperty from './pages/dashboard/NewProperty';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<SingleProduct />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="new-property" element={<NewProperty />} />
          <Route element={<AdminRoute />}>
            <Route index={true} element={<Dashboard />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="manage-users" element={<AdminViewUsers />} />
            <Route path="manage-users/new" element={<NewUser />} />
          </Route>

          <Route element={<TechnicianRoute />}>
            <Route
              path="technician-tools"
              element={<h1>Technician Tools Page</h1>}
            />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chats />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
