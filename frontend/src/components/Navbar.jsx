import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Dog, ShoppingCart, ShieldCheck, Search, User } from 'lucide-react';
import { Badge, Tooltip, IconButton } from '@mui/material';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isUserMode = !location.pathname.startsWith('/admin');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      e.target.search.value = ''; // Optional: clear search after submit
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <Dog size={32} color="var(--primary)" />
            PetStore Pro
          </Link>

          <form className="search-container" onSubmit={handleSearch}>
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              name="search"
              placeholder="Search for pets, breeds, or categories..." 
              className="search-input"
            />
          </form>

          <div className="nav-actions">
            <Tooltip title="View Shopping Cart">
              <Link to="/cart" className="cart-btn" style={{ padding: '8px' }}>
                <Badge badgeContent={cartItems.length} color="warning" overlap="circular">
                  <ShoppingCart size={24} />
                </Badge>
              </Link>
            </Tooltip>
            <NavLink 
              to="/" 
              className={`btn ${isUserMode ? 'btn-admin-active' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem' }}
            >
              <User size={18} /> User
            </NavLink>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => `btn ${isActive ? 'btn-admin-active' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem' }}
            >
              <ShieldCheck size={18} /> Admin
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="sub-navbar">
        <div className="nav-links">
          <NavLink to="/shop" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Shop All</NavLink>
          <NavLink to="/category/Dog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dogs</NavLink>
          <NavLink to="/category/Cat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Cats</NavLink>
          <NavLink to="/category/Bird" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Birds</NavLink>
          <NavLink to="/category/Fish" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Fish</NavLink>
          <NavLink to="/category/Other" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Others</NavLink>
        </div>
      </div>
    </>
  );
}
