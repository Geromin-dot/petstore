import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import PetList from '../components/PetList';
import AddPetForm from '../components/AddPetForm';

const API_URL = 'http://localhost:8080/api/pets';

export default function Admin() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPets(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAddPet = async (petData) => {
    try {
      const payload = {
        ...petData,
        price: parseFloat(petData.price) || 0
      };
      
      if (editingPet) {
        await axios.put(`${API_URL}/${editingPet.id}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      
      setShowAddForm(false);
      setEditingPet(null);
      fetchPets();
    } catch (error) {
      console.error('Error saving pet:', error);
    }
  };

  const handleEditClick = (pet) => {
    setEditingPet(pet);
    setShowAddForm(true);
  };

  const handleDeletePet = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPets();
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <button className="btn" onClick={() => { setEditingPet(null); setShowAddForm(true); }}>
          <Plus size={20} /> Add New Pet
        </button>
      </div>

      {loading ? (
        <div className="loader-container"><div className="spinner"></div></div>
      ) : (
        <PetList pets={pets} isAdminView={true} onDelete={handleDeletePet} onEdit={handleEditClick} />
      )}

      {showAddForm && (
        <AddPetForm 
          initialData={editingPet}
          onSubmit={handleAddPet} 
          onCancel={() => { setShowAddForm(false); setEditingPet(null); }} 
        />
      )}
    </div>
  );
}
