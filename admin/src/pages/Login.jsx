import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', {
          email,
          password,
        });
        if (data.success) {
          toast.success(data.message, { autoClose: 1000 });
          setTimeout(() => {
            localStorage.setItem('aToken', data.token);
            setAToken(data.token);
          }, 1500);
          navigate('/admin-dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative w-full px-8 py-12 sm:px-16 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 flex items-center">
        <div className="relative mx-auto w-full max-w-xl">
          {/* Glass effect card */}
          <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100">
            {/* Logo or Brand Section */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm">
                Sign in to your {state} account
              </p>
            </div>

            {/* Toggle Button */}
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button
                className={`flex-1 py-2 text-sm rounded-md transition-all duration-300 ${
                  state === 'Admin'
                    ? 'bg-white shadow-md text-primary font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setState('Admin')}
              >
                Admin
              </button>
              <button
                className={`flex-1 py-2 text-sm rounded-md transition-all duration-300 ${
                  state === 'Doctor'
                    ? 'bg-white shadow-md text-primary font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setState('Doctor')}
              >
                Doctor
              </button>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock size={16} className="text-gray-400" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 grid place-content-center px-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-500">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full rounded-lg bg-gradient-to-r from-primary to-blue-600 p-4 text-sm font-medium text-white transition-all duration-300 hover:from-primary/90 hover:to-blue-600/90 focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:opacity-70"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Image Section */}
      <aside className="relative hidden lg:block lg:w-1/2">
        <img
          alt="Medical Background"
          src="https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-blue-500/40 backdrop-blur-[2px]" />
        
        {/* Content overlay on image */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-4 max-w-xl backdrop-blur-sm bg-black/20 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold">Medisync</h2>
            <p className="text-gray-200">
              Access patient records, manage appointments, and more.
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Login;