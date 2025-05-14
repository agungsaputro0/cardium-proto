import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoadingSpinner from '../atoms/LoadingSpinner';

type StakeholderRouteProps = {
  children: ReactNode;
};

const StakeholderRoute = ({ children }: StakeholderRouteProps) => {
  const { userName, loading, userType } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userName) {
    return <Navigate to="/Login" replace />;
  }

  if (userType === "user") {
    return <Navigate to="/Home" replace />; 
  }

  return <>{children}</>;
};

export default StakeholderRoute;
