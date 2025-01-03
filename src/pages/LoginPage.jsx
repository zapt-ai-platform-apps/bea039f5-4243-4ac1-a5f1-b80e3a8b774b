import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign in with ZAPT</h2>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'apple']}
          appearance={{ theme: ThemeSupa }}
          onlyThirdPartyProviders={false}
        />
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-500 underline">Register</a>
        </p>
        <p className="mt-4 text-center">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer">ZAPT</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;