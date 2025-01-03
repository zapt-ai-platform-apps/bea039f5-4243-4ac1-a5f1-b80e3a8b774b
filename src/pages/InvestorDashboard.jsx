import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const InvestorDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*');

    if (error) {
      console.error(error);
    } else {
      setProperties(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Investor Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Search properties..."
          className="w-full border px-3 py-2 rounded box-border mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProperties.map((property) => (
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

export default InvestorDashboard;