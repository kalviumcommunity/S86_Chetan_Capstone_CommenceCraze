import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function Home() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark to-dark-800">
      {/* Hero Section */}
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo/Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient">Commence Craze</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-4">
            Start the Buzz. Fuel the Craze.
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            An intelligent, full-stack MERN platform for seamless event management 
            in academic and public institutions, designed to elevate customer engagement 
            and streamline event operations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-3 shadow-glow"
              >
                Get Started
              </motion.button>
            </Link>
            
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline text-lg px-8 py-3"
              >
                Login
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          {[
            {
              icon: '🔐',
              title: 'Role-Based Access',
              description: 'Secure authentication for Admins, Organizers, and Customers'
            },
            {
              icon: '📅',
              title: 'Event Management',
              description: 'Create, manage, and track events with ease'
            },
            {
              icon: '📊',
              title: 'Analytics Dashboard',
              description: 'Get insights with role-specific metrics'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2 }}
              className="card text-center hover:shadow-glow transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-primary">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
