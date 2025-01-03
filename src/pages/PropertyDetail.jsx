import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProperty = async () => {
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session.access_token;

      const response = await fetch(`/api/properties?id=${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProperty(data[0]);
      } else {
        console.error('Error fetching property:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleRequestAppointment = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session.access_token;

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          property_id: id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error requesting appointment:', errorData.error);
      } else {
        alert('Appointment request sent!');
      }
    } catch (error) {
      console.error('Error requesting appointment:', error);
    }
  };

  if (loading) {
    return <p>Loading property...</p>;
  }

  if (!property) {
    return <p>Property not found.</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto h-full">
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      <p className="mb-4">{property.description}</p>
      <button
        onClick={handleRequestAppointment}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Request Appointment
      </button>
    </div>
  );
};

export default PropertyDetail;