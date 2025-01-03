import { supabase } from '../supabaseClient';

export const handleAddProperty = async (e, { title, description, documents, setLoading, navigate }) => {
  e.preventDefault();
  setLoading(true);

  let documentUrl = '';
  if (documents) {
    const { data, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(`public/${documents.name}`, documents);

    if (uploadError) {
      console.error(uploadError);
    } else {
      documentUrl = data.path;
    }
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session.access_token;

    const response = await fetch('/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description,
        document_url: documentUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error adding property:', errorData.error);
    } else {
      navigate('/owner/dashboard');
    }
  } catch (error) {
    console.error('Error adding property:', error);
  }

  setLoading(false);
};