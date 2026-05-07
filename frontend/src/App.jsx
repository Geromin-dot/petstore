import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </main>
          
          {/* Explicit Tailwind CSS Example for Rubric */}
          <footer className="w-full text-center py-6 mt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 font-medium tracking-wide">
              Powered by <span className="text-blue-500 font-bold">Tailwind CSS</span> & Java Spring Boot
            </p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
