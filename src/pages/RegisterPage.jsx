import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    alert('Registration successful! Please check your email to confirm your account.');
    navigate('/login');
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register with ZAPT</h2>
        <RegisterForm onSuccess={handleSuccess} />
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500 underline">Login</a>
        </p>
        <p className="mt-4 text-center">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer">ZAPT</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;