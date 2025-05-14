import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

type RedirectIfLoggedInProps = {
    children: ReactNode; 
  };

const RedirectIfLoggedIn = ({ children }: RedirectIfLoggedInProps) => {
  const { userName, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      if (userType === "user") {
        navigate('/home');
      } else {
        navigate('/portal'); 
      }
    }
  }, [userName, userType, navigate]);

  return <>{children}</>;; 
};

export default RedirectIfLoggedIn;


