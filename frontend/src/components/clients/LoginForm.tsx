import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import { toast, Toaster } from 'sonner';
import { useFormik } from 'formik';
import LoginImage from '/loginbg.png';
import authService from '../../state/features/auth/authService';
import { GoogleLogin } from 'react-google-login';

const LoginForm = () => {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const saveToken = async (token: any) => {
    try {
      sessionStorage.setItem('token', token);
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await authService.getProfile();
      if (response.status === 200) {
        localStorage.setItem('profile', JSON.stringify(response.data.user));
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Failed to fetch profile');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('Profile fetch failed:', error);
    }
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await authService.login(values);
        if (response.status === 200) {
          toast.success('Logged in successfully!');
          saveToken(response.data.session.token);
          await fetchProfile();
        } else {
          toast.error(response.message || 'Incorrect email or password');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
        console.error('Login failed:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="bg-primary min-h-screen flex items-center justify-center text-white">
        <div className="w-11/12 max-w-4xl bg-superior shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white mb-6 hover:text-white"
            >
              Lala Rentals
            </Link>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <h1 className="text-3xl font-bold mb-4 text-secondary">
                Log into your account
              </h1>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Enter email
                </label>
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps('email')}
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-md bg-primary border border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Enter password
                </label>
                <input
                  type="password"
                  id="password"
                  {...formik.getFieldProps('password')}
                  placeholder="Your password"
                  className="w-full p-3 rounded-md bg-primary border border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-3 bg-secondary text-primary font-bold rounded-md hover:bg-white hover:text-secondary transition"
              >
                {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
              <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                buttonText="Login with Google"
                cookiePolicy={'single_host_origin'}
                className="w-full mt-4"
              />
            </form>
          </div>
          <div className="hidden md:block">
            <img
              src={LoginImage}
              alt="Login illustration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
