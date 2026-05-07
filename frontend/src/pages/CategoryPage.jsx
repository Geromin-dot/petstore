import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PetList from '../components/PetList';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetsByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/manese/pets/category/${categoryName}`);
        setPets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPetsByCategory();
  }, [categoryName]);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', textTransform: 'capitalize' }}>
        {categoryName === 'Fish' ? 'Fish' : `${categoryName}s`}
      </h1>
      {loading ? (
        <div className="loader-container"><div className="spinner"></div></div>
      ) : (
        <PetList pets={pets} />
      )}
    </div>
  );
}
