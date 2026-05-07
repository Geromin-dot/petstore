import { Image as ImageIcon, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function PetList({ pets, isAdminView, onDelete, onEdit }) {
  const { addToCart, cartItems } = useCart();

  if (!pets || pets.length === 0) {
    return (
      <div className="empty-state">
        <PawIcon />
        <h2>No pets found</h2>
        <p>No pets available in this category.</p>
      </div>
    );
  }

  return (
    <div className="pets-grid">
      {pets.map((pet) => {
        const inCart = cartItems.some(item => item.id === pet.id);
        const isAvailable = pet.status?.toLowerCase() === 'available';

        return (
          <div key={pet.id} className="card pet-card">
            {pet.imageUrl ? (
              <img src={pet.imageUrl} alt={pet.name} className="pet-image" />
            ) : (
              <div className="pet-image-placeholder">
                <ImageIcon size={48} />
              </div>
            )}
            
            <div className="pet-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 className="pet-name">{pet.name}</h3>
                <span className={`pet-badge badge-${pet.status?.toLowerCase() || 'available'}`}>
                  {pet.status || 'Available'}
                </span>
              </div>
              
              <div style={{ color: 'var(--text-muted)' }}>{pet.breed}</div>
              
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', flex: 1, color: 'var(--text-muted)' }}>
                {pet.description || 'No description provided.'}
              </p>
              
              <div className="pet-details">
                <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>
                  ${pet.price ? pet.price.toFixed(2) : '0.00'}
                </span>
                
                {isAdminView ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => onEdit && onEdit(pet)}
                      className="btn-theme-action"
                      style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(pet.id)}
                      className="btn-theme-action"
                      style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(pet)}
                    className="btn"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    disabled={!isAvailable || inCart}
                  >
                    <ShoppingCart size={16} /> 
                    {inCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PawIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 8a2 2 0 0 0-2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 0-2-2Z" />
      <path d="M5 8a2 2 0 0 0-2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 0-2-2Z" />
      <path d="M12 11c-2.76 0-5 2.24-5 5v4c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-4c0-2.76-2.24-5-5-5Z" />
    </svg>
  );
}
