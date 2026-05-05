import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PetList from '../components/PetList';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/pets/search?query=${query}`);
        setPets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error searching pets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Search Results for "{query}"</h1>
      {loading ? (
        <div className="loader-container"><div className="spinner"></div></div>
      ) : (
        <>
          {pets.length > 0 ? (
            <PetList pets={pets} />
          ) : (
            <div className="empty-state">
              <h2>No pets found matching "{query}"</h2>
              <p>Try searching for a different name or breed.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
