import { useState, useEffect } from 'react';

export default function AddPetForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    breed: initialData?.breed || '',
    category: initialData?.category || '',
    status: initialData?.status || 'Available',
    imageUrl: initialData?.imageUrl || '',
    price: initialData?.price || '',
    description: initialData?.description || ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        breed: initialData.breed || '',
        category: initialData.category || '',
        status: initialData.status || 'Available',
        imageUrl: initialData.imageUrl || '',
        price: initialData.price || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          className="form-control" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="breed">Breed</label>
        <input 
          type="text" 
          id="breed" 
          name="breed" 
          className="form-control" 
          value={formData.breed} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select 
          id="category" 
          name="category" 
          className="form-control" 
          value={formData.category} 
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Fish">Fish</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select 
          id="status" 
          name="status" 
          className="form-control" 
          value={formData.status} 
          onChange={handleChange}
        >
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
          <option value="Sold">Sold</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="price">Price ($)</label>
        <input 
          type="number" 
          id="price" 
          name="price" 
          step="0.01"
          className="form-control" 
          value={formData.price} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          name="description" 
          className="form-control" 
          value={formData.description} 
          onChange={handleChange} 
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL (Optional)</label>
        <input 
          type="url" 
          id="imageUrl" 
          name="imageUrl" 
          className="form-control" 
          value={formData.imageUrl} 
          onChange={handleChange} 
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div className="form-actions" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn">
          Save Pet
        </button>
      </div>
    </form>
  );
}
