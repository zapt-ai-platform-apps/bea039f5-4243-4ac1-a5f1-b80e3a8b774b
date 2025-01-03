import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddProperty = async (e) => {
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

    const { data, error } = await supabase
      .from('properties')
      .insert({
        owner_id: supabase.auth.user().id,
        title,
        description,
        document_url: documentUrl,
      });

    if (error) {
      console.error(error);
    } else {
      navigate('/owner/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Property</h1>
      <form onSubmit={handleAddProperty} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded box-border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded box-border"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Official Documents</label>
          <input
            type="file"
            onChange={(e) => setDocuments(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;