import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Heart } from 'lucide-react';
import heroImage from '../assets/hero.png';

export default function Home() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your <span className="text-gradient">Perfect Companion</span>
          </h1>
          <p className="hero-subtitle">
            Find your perfect companion among our diverse collection of lovable pets, from cuddly friends to exotic feathery and scaly family members.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-large">
              Browse Pets <ArrowRight size={20} />
            </Link>
            <a href="#categories" className="btn-secondary btn-large">
              Explore Categories
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper">
          {/* USER PLACEHOLDER: Add your hero images here (replace the divs with img tags, keep the classes) */}
          <div className="hero-collage">
            <img
              src={heroImage}
              alt="Main Pet"
              className="image-placeholder collage-main"
              style={{ objectFit: 'cover' }}
            />
            <img
              src="https://pet-health-content-media.chewy.com/wp-content/uploads/2025/09/03234802/how-to-pet-a-dog.jpg"
              alt="Top Pet"
              className="image-placeholder collage-top"
              style={{ objectFit: 'cover' }}
            />
            <img
              src="https://www.thepetexpress.co.uk/blog-admin/wp-content/uploads/2012/05/shutterstock_722171287.jpg"
              alt="Bottom Pet"
              className="image-placeholder collage-bottom"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <ShieldCheck size={32} className="feature-icon" />
          </div>
          <h3>Health Certified</h3>
          <p>Every pet in our store undergoes rigorous health checks by veterinary professionals.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Truck size={32} className="feature-icon" />
          </div>
          <h3>Safe Rehoming</h3>
          <p>We ensure a smooth and comfortable transition for your new pet to their forever home.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Heart size={32} className="feature-icon" />
          </div>
          <h3>Ethical Sourcing</h3>
          <p>We work exclusively with responsible breeders who prioritize animal welfare and love.</p>
        </div>
      </section>

      {/* Categories Preview */}
      <section id="categories" className="landing-categories">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find the perfect new addition to your family from our happy community</p>
        </div>

        <div className="category-grid">
          {[
            { name: 'Dogs', url: '/category/Dog', img: 'https://www.cdc.gov/healthy-pets/media/images/2024/04/GettyImages-598175960-cute-dog-headshot.jpg' },
            { name: 'Cats', url: '/category/Cat', img: 'https://happycatshaven.org/wp-content/uploads/2019/07/PettingCatLeansInIvy2013sm.jpg' },
            { name: 'Birds', url: '/category/Bird', img: 'https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/1673380921773-CGSRGHGIH1LUDW3KKSRE/unsplash-image-zOKrNguZwKo.jpg' },
            { name: 'Fish', url: '/category/Fish', img: 'https://guidesly-assets.s3.us-east-2.amazonaws.com/content/fish_as_pet_e3e80b332c.jpg' }
          ].map((cat) => (
            <Link key={cat.name} to={cat.url} className="category-card-link">
              <div className="category-card-landing">
                <img src={cat.img} alt={cat.name} className="image-placeholder category-placeholder" style={{ objectFit: 'cover' }} />
                <div className="category-card-content">
                  <h3>{cat.name}</h3>
                  <span className="shop-link">Shop Collection &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Join Our Pet Lover Community</h2>
          <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="form-control" />
            <button type="submit" className="btn">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
