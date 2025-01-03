import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProperty = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setProperty(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleRequestAppointment = async () => {
    const { error } = await supabase
      .from('appointments')
      .insert({
        property_id: id,
        investor_id: supabase.auth.user().id,
        status: 'pending',
      });

    if (error) {
      console.error(error);
    } else {
      alert('Appointment request sent!');
    }
  };

  if (loading) {
    return <p>Loading property...</p>;
  }

  if (!property) {
    return <p>Property not found.</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
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