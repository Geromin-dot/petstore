import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
import { Alert, AlertTitle, Container, Typography, Box } from '@mui/material';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: ''
  });

  if (cartItems.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const orderData = {
        ...formData,
        items: cartItems.map(item => ({
          pet: { id: item.id }
        }))
      };
      
      await axios.post('http://localhost:8080/manese/orders', orderData);
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert 
          severity="success" 
          icon={<CheckCircle size={40} />}
          sx={{ borderRadius: '1rem', p: 4 }}
        >
          <AlertTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Order Confirmed!</AlertTitle>
          <Typography variant="body1">
            Thank you for giving these pets a new home. Your order has been placed successfully.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <button className="btn" onClick={() => navigate('/')}>
              Return to Store
            </button>
          </Box>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="checkout-page" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          Payment Details
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>
            <input 
              type="text" 
              id="customerName" 
              className="form-control" 
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="customerEmail">Email Address</label>
            <input 
              type="email" 
              id="customerEmail" 
              className="form-control" 
              value={formData.customerEmail}
              onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
              required 
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0', padding: '1rem', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '0.5rem' }}>
            <span>Order Total ({cartItems.length} items):</span>
            <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>${cartTotal.toFixed(2)}</span>
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </form>
      </div>
    </div>
  );
}
