import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PawPrint, ShoppingCart, ShieldCheck, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

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
            <PawPrint size={32} color="var(--primary)" />
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
            <Link to="/cart" className="cart-btn">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </Link>
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
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>All</NavLink>
          <NavLink to="/category/Dog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dogs</NavLink>
          <NavLink to="/category/Cat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Cats</NavLink>
          <NavLink to="/category/Bird" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Birds</NavLink>
          <NavLink to="/category/Fish" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Fish</NavLink>
        </div>
      </div>
    </>
  );
}
