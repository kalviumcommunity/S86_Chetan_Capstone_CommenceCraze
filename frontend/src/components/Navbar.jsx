import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      setMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-dark-800 border-b border-dark-700">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold">
            <span className="text-gradient">Commence Craze</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-primary focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/events" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Events
                </Link>
                
                {/* User Menu */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm hidden lg:block">
                    Welcome, <span className="text-primary">{user?.name}</span>
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="btn-outline py-2 px-3 lg:px-4 text-sm"
                  >
                    Logout
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary py-2 px-3 lg:px-4 text-sm"
                  >
                    Register
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-3"
            >
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-primary transition-colors py-2"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/events" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-primary transition-colors py-2"
                  >
                    Events
                  </Link>
                  <div className="text-gray-400 py-2 text-sm">
                    Welcome, <span className="text-primary">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-outline w-full py-2 px-4 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-primary transition-colors py-2"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="btn-primary w-full py-2 px-4 text-sm">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
