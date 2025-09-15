import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Menu, X, ChevronDown, Bell, User, Calendar, LogOut } from 'lucide-react';
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const [showNotifications, setShowNotifications] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showMenu]);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Find Doctors' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  const notifications = [
    { id: 1, text: 'Appointment confirmed with Dr. Smith', time: '2 mins ago' },
    { id: 2, text: 'Reminder: Upcoming appointment tomorrow', time: '1 hour ago' },
  ];

  return (
    <>
      {/* Spacer div with responsive height */}
      <div className="h-24 md:h-24"></div>
      
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-lg'
      }`}>
        {/* Main Navbar Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28 md:h-24">
            {/* Logo Section */}
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <img
                src={assets.logo}
                alt="MediSync Logo"
                className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-2xl font-bold text-primary tracking-tight hover:text-primary/90 transition-colors">
                MediSync
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary group ${
                      isActive ? 'text-primary' : 'text-gray-700'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-200 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Rest of the code remains the same... */}
            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {token ? (
                <>
                  {/* Notifications */}
                  <div className="relative hidden md:block">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200"
                    >
                      <Bell className="w-5 h-5 text-gray-600" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </button>
                    
                    {/* Notifications Dropdown */}
                    {showNotifications && (
                      <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                          >
                            <p className="text-sm text-gray-600">{notification.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* User Menu - Desktop */}
                  <div className="relative hidden md:block group">
                    <button className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="relative">
                        <img
                          src={userData.image}
                          alt="Profile"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/30"
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                    </button>

                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{userData.email}</p>
                      </div>
                      <button
                        onClick={() => navigate('/my-profile')}
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => navigate('/my-appointments')}
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>My Appointments</span>
                      </button>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={logout}
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/20 hover:-translate-y-0.5 hidden md:block"
                >
                  Get Started
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMenu(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Mobile Menu Panel */}
          <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 transform ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <img
                  src={assets.logo}
                  alt="MediSync Logo"
                  className="w-12 h-12 object-contain"
                />
                <span className="text-xl font-bold text-primary">MediSync</span>
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            {/* Mobile Menu Content */}
            <div className="overflow-y-auto h-full bg-white">
              <div className="px-4 py-6">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMenu(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                {!token && (
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        navigate('/login');
                        setShowMenu(false);
                      }}
                      className="w-full bg-primary text-white px-4 py-3 rounded-lg font-medium text-base hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/30"
                    >
                      Get Started
                    </button>
                  </div>
                )}

                {token && (
                  <div className="mt-6 border-t pt-6">
                    <div className="flex items-center space-x-3 px-4 mb-6">
                      <img
                        src={userData.image}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{userData.name}</p>
                        <p className="text-sm text-gray-500">{userData.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          navigate('/my-profile');
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/my-appointments');
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        <Calendar className="w-5 h-5" />
                        <span className="font-medium">My Appointments</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;