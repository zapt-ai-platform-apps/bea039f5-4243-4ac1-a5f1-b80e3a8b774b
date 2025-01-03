import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      if (user.user_metadata.role === 'owner') {
        navigate('/owner/dashboard');
      } else if (user.user_metadata.role === 'investor') {
        navigate('/investor/dashboard');
      } else if (user.user_metadata.role === 'admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Real Estate Investment</h1>
      <p className="mb-4">An application for investing in land properties.</p>
      <div>
        <img src="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw3fHxSZWFsJTIwZXN0YXRlJTIwbGFuZHNjYXBlJTIwd2l0aCUyMG1vZGVybiUyMGJ1aWxkaW5nc3xlbnwwfHx8fDE3MzU4ODk5Njd8MA&ixlib=rb-4.0.3&q=80&w=1080"  alt="Real Estate" data-image-request="Real estate landscape with modern buildings" className="w-full max-w-md" />
      </div>
    </div>
  );
};

export default HomePage;