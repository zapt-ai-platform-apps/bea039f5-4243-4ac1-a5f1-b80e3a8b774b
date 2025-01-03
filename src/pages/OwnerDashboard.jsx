import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session.access_token;

      const response = await fetch('/api/properties', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.error('Error fetching properties:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="p-4 h-full">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <Link to="/owner/add-property" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
        Add New Property
      </Link>
      <div className="mt-4">
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {properties.map((property) => (
              <div key={property.id} className="border p-4 rounded">
                <h2 className="text-xl font-bold">{property.title}</h2>
                <p>{property.description}</p>
                <Link to={`/properties/${property.id}`} className="text-blue-500 underline">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;