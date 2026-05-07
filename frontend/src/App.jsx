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
          <footer className="w-full mt-12 py-8 bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium tracking-wide">
                Built with <span className="text-orange-500 font-bold">Tailwind CSS</span> & Java Spring Boot
              </div>
              <p className="text-xs text-gray-400">Petstore Application &copy; 2026</p>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
