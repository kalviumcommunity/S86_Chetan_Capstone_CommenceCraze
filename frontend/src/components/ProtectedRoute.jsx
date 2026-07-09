import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

/**
 * ProtectedRoute Component
 * A wrapper component used to restrict access to authenticated users only.
 * Redirects unauthorized users to the `/login` route.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render if user is authenticated.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
