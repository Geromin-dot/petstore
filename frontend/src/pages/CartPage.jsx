import { Link } from 'react-router-dom';
import { Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any pets to your cart yet.</p>
        <Link to="/" className="btn" style={{ marginTop: '1rem' }}>Browse Pets</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
      
      <div className="cart-container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem' }}>
              <img 
                src={item.imageUrl || 'https://via.placeholder.com/100'} 
                alt={item.name} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }} 
              />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{item.breed}</p>
                <p style={{ fontWeight: 'bold', color: 'var(--success)', marginTop: '0.5rem' }}>${item.price?.toFixed(2) || '0.00'}</p>
              </div>
              <button 
                className="btn-danger" 
                onClick={() => removeFromCart(item.id)}
                style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', background: 'transparent', alignSelf: 'flex-start' }}
              >
                <Trash2 size={20} color="var(--danger)" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary card" style={{ height: 'fit-content' }}>
          <h2>Order Summary</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1.5rem 0', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            <span>Total Items:</span>
            <span>{cartItems.length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span style={{ color: 'var(--success)' }}>${cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
            <CreditCard size={20} /> Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
