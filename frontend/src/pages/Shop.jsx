import { useState, useEffect } from 'react';
import axios from 'axios';
import PetList from '../components/PetList';
import API_BASE_URL from '../config';

export default function Shop() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/pets`);
        setPets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>All Pets</h1>
      {loading ? (
        <div className="loader-container"><div className="spinner"></div></div>
      ) : (
        <PetList pets={pets} />
      )}
    </div>
  );
}
