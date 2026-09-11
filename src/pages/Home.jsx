import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import "./Home.css";

function Home() {
  // ========================================
  // HERO SLIDER
  // ========================================

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80",
      smallTitle: "NEW COLLECTION",
      title: "Beauty That",
      highlight: "Feels Like You",
      description:
        "Discover makeup essentials designed to bring out your natural beauty.",
      button: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1600&q=80",
      smallTitle: "GLOW COLLECTION",
      title: "Glow Every",
      highlight: "Single Day",
      description:
        "Create a flawless look with our premium beauty collection.",
      button: "Explore Collection",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
      smallTitle: "BEAUTY ESSENTIALS",
      title: "Your Beauty",
      highlight: "Your Rules",
      description:
        "Find everything you need for your perfect makeup routine.",
      button: "Discover More",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // ========================================
  // AUTO SLIDE
  // ========================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // ========================================
  // NEXT / PREVIOUS
  // ========================================

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // ========================================
  // CATEGORIES
  // ========================================

  const categories = [
    {
      name: "Face",
      icon: "✨",
      description: "Foundation, concealer & more",
    },
    {
      name: "Eyes",
      icon: "👁️",
      description: "Eye shadow, mascara & liner",
    },
    {
      name: "Lips",
      icon: "💄",
      description: "Lipstick, gloss & lip care",
    },
    {
      name: "Blush",
      icon: "🌸",
      description: "Blush & highlighter",
    },
    {
      name: "Brushes",
      icon: "🖌️",
      description: "Professional makeup brushes",
    },
    {
      name: "Skincare",
      icon: "🧴",
      description: "Care for beautiful skin",
    },
  ];

  // ========================================
  // TRENDING PRODUCTS
  // ========================================

  const products = [
    {
      name: "Matte Foundation",
      price: "₹699",
      oldPrice: "₹899",
      image:
        "https://images.unsplash.com/photo-1631730486572-226d1d8c9e1b?auto=format&fit=crop&w=600&q=80",
      rating: "★★★★★",
    },
    {
      name: "Luxury Lipstick",
      price: "₹499",
      oldPrice: "₹699",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
      rating: "★★★★★",
    },
    {
      name: "Glow Highlighter",
      price: "₹599",
      oldPrice: "₹799",
      image:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=600&q=80",
      rating: "★★★★☆",
    },
    {
      name: "Beauty Blush",
      price: "₹449",
      oldPrice: "₹599",
      image:
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80",
      rating: "★★★★★",
    },
  ];

  return (
    <div className="home">
      <Header />

      {/* ========================================
          HERO SLIDER
      ======================================== */}

      <section className="hero">
        <div
          className="hero-slider"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
          }}
        >
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <span className="hero-small-title">
              {slides[currentSlide].smallTitle}
            </span>

            <h1>
              {slides[currentSlide].title}
              <br />
              <span>{slides[currentSlide].highlight}</span>
            </h1>

            <p>{slides[currentSlide].description}</p>

            <button className="hero-button">
              {slides[currentSlide].button}
              <span> →</span>
            </button>
          </div>

          {/* Previous */}
          <button
            className="slider-arrow slider-prev"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>

          {/* Next */}
          <button
            className="slider-arrow slider-next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Dots */}
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${
                  currentSlide === index ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          BENEFITS
      ======================================== */}

      <section className="benefits">
        <div className="benefit">
          <div className="benefit-icon">🚚</div>
          <div>
            <h3>Free Shipping</h3>
            <p>On orders above ₹999</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">🔒</div>
          <div>
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">💝</div>
          <div>
            <h3>Premium Quality</h3>
            <p>Carefully selected products</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">↩️</div>
          <div>
            <h3>Easy Returns</h3>
            <p>Simple return process</p>
          </div>
        </div>
      </section>

      {/* ========================================
          CATEGORIES
      ======================================== */}

      <section className="categories-section">
        <div className="section-heading">
          <span>EXPLORE</span>
          <h2>Shop By Category</h2>
          <p>Everything you need to create your perfect look.</p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <div className="category-card" key={category.name}>
              <div className="category-icon">{category.icon}</div>

              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <button>
                Shop Now <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PROMOTIONAL BANNER
      ======================================== */}

      <section className="promo-section">
        <div className="promo-content">
          <span>LIMITED TIME OFFER</span>

          <h2>
            Get Ready to
            <br />
            <strong>Glow ✨</strong>
          </h2>

          <p>
            Get up to <strong>30% OFF</strong> on selected beauty
            essentials.
          </p>

          <button>Shop Offers →</button>
        </div>

        <div className="promo-decoration">
          <div className="promo-circle"></div>
          <span>30%</span>
          <small>OFF</small>
        </div>
      </section>

      {/* ========================================
          TRENDING PRODUCTS
      ======================================== */}

      <section className="products-section">
        <div className="section-heading">
          <span>OUR PICKS</span>
          <h2>Trending Products</h2>
          <p>Beauty favorites loved by our customers.</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.name}>
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} />

                <span className="sale-badge">SALE</span>

                <button
                  className="wishlist"
                  aria-label="Add to wishlist"
                >
                  ♡
                </button>

                <button className="quick-view">
                  Quick View
                </button>
              </div>

              <div className="product-info">
                <div className="product-rating">
                  {product.rating}
                </div>

                <h3>{product.name}</h3>

                <div className="product-price">
                  <strong>{product.price}</strong>
                  <del>{product.oldPrice}</del>
                </div>

                <button className="add-cart">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button className="view-all">
            View All Products →
          </button>
        </div>
      </section>

      {/* ========================================
          BEAUTY BANNER
      ======================================== */}

      <section className="beauty-banner">
        <div className="beauty-banner-content">
          <span>BEAUTY BEGINS HERE</span>

          <h2>
            Your Skin.
            <br />
            Your Beauty.
            <br />
            <strong>Your Story.</strong>
          </h2>

          <p>
            Discover products that make you feel confident,
            beautiful and completely yourself.
          </p>

          <button>Discover Your Beauty →</button>
        </div>

        <div className="beauty-banner-image">
          <img
            src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80"
            alt="Beauty model"
          />
        </div>
      </section>

      {/* ========================================
          WHY CHOOSE US
      ======================================== */}

      <section className="why-section">
        <div className="section-heading">
          <span>WHY US</span>
          <h2>Beauty You Can Trust</h2>
          <p>We care about what you put on your skin.</p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div>🌿</div>
            <h3>Skin Friendly</h3>
            <p>
              Products selected with your skin and beauty
              routine in mind.
            </p>
          </div>

          <div className="why-card">
            <div>💎</div>
            <h3>Premium Products</h3>
            <p>
              High-quality beauty products at prices you'll
              love.
            </p>
          </div>

          <div className="why-card">
            <div>❤️</div>
            <h3>Made With Love</h3>
            <p>
              We carefully choose products that help you feel
              confident.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          NEWSLETTER
      ======================================== */}

      <section className="newsletter">
        <div>
          <span>STAY BEAUTIFUL</span>
          <h2>Join Our Beauty Community</h2>
          <p>
            Get exclusive offers, new product updates and
            beauty tips.
          </p>
        </div>

        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address"
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
}

export default Home;