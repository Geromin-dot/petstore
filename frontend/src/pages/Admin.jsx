import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, Snackbar, Alert } from '@mui/material';
import PetList from '../components/PetList';
import AddPetForm from '../components/AddPetForm';
import API_BASE_URL from '../config';

const API_URL = `${API_BASE_URL}/pets`;

export default function Admin() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

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
      setNotification({ open: true, message: editingPet ? 'Pet updated successfully!' : 'New pet added successfully!', severity: 'success' });
      fetchPets();
    } catch (error) {
      console.error('Error saving pet:', error);
      setNotification({ open: true, message: 'Failed to save pet.', severity: 'error' });
    }
  };

  const handleEditClick = (pet) => {
    setEditingPet(pet);
    setShowAddForm(true);
  };

  const handleDeletePet = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotification({ open: true, message: 'Pet deleted successfully.', severity: 'info' });
      fetchPets();
    } catch (error) {
      console.error('Error deleting pet:', error);
      setNotification({ open: true, message: 'Error deleting pet.', severity: 'error' });
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

      <Dialog 
        open={showAddForm} 
        onClose={() => { setShowAddForm(false); setEditingPet(null); }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingPet ? 'Edit Pet Details' : 'Add New Pet'}</DialogTitle>
        <DialogContent>
          <AddPetForm 
            initialData={editingPet}
            onSubmit={handleAddPet} 
            onCancel={() => { setShowAddForm(false); setEditingPet(null); }} 
          />
        </DialogContent>
      </Dialog>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
