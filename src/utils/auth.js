import { supabase } from '../supabaseClient';

export const signUp = async (email, password, role) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role } },
  });
  return { error };
};