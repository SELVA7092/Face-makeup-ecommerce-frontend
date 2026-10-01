import { useState } from "react";
import "./Dashboard_seller.css";

function Dashboard_seller() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "products", icon: "🛍️", label: "My Products" },
    { id: "add-product", icon: "➕", label: "Add Product" },
    { id: "orders", icon: "📦", label: "Orders" },
    { id: "reviews", icon: "⭐", label: "Reviews" },
    { id: "customers", icon: "👥", label: "Customers" },
    { id: "sales", icon: "💰", label: "Sales & Earnings" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "inventory", icon: "📋", label: "Inventory" },
    { id: "coupons", icon: "🎟️", label: "Coupons" },
    { id: "messages", icon: "💬", label: "Messages" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };

  const activeItem = menuItems.find(
    (item) => item.id === activeMenu
  );

  return (
    <div className="seller-dashboard">

      {/* SIDEBAR */}
      <aside className="seller-sidebar">

        {/* LOGO */}
        <div className="seller-logo">
          <div className="seller-logo-icon">
            🛍️
          </div>

          <div>
            <h2>
              My<span>Shop</span>
            </h2>

            <p>Seller Center</p>
          </div>
        </div>

        {/* SELLER PROFILE */}
        <div className="seller-profile">

          <div className="seller-avatar">
            👤
          </div>

          <div className="seller-profile-info">
            <h3>Seller</h3>
            <span>SELLER</span>
          </div>

        </div>

        {/* MENU */}
        <nav className="seller-menu">

          <p className="menu-title">
            SELLER MENU
          </p>

          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                activeMenu === item.id
                  ? "seller-menu-item active"
                  : "seller-menu-item"
              }
              onClick={() =>
                handleMenuClick(item.id)
              }
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              <span className="menu-label">
                {item.label}
              </span>
            </button>
          ))}

        </nav>

        {/* BACK TO SHOP */}
        <button
          type="button"
          className="back-to-shop"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          🏠
          <span>Back to Shop</span>
        </button>

      </aside>

      {/* MAIN */}
      <main className="seller-main">

        {/* HEADER */}
        <header className="seller-header">

          <div>
            <p className="welcome-text">
              Welcome back 👋
            </p>

            <h1>
              Seller Dashboard
            </h1>
          </div>

          <div className="seller-header-actions">

            <button
              type="button"
              className="notification-button"
              title="Notifications"
            >
              🔔
              <span className="notification-dot">
                3
              </span>
            </button>

            <div className="header-seller">

              <div className="header-avatar">
                👤
              </div>

              <div>
                <strong>Seller</strong>
                <span>Seller Account</span>
              </div>

            </div>

          </div>

        </header>

        {/* DASHBOARD */}
        {activeMenu === "dashboard" && (
          <section className="dashboard-content">

            {/* STATS */}
            <div className="stats-grid">

              <div className="stat-card">

                <div className="stat-icon products-icon">
                  🛍️
                </div>

                <div>
                  <p>My Products</p>
                  <h2>24</h2>
                  <span className="stat-positive">
                    ↑ 8% this month
                  </span>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon orders-icon">
                  📦
                </div>

                <div>
                  <p>Total Orders</p>
                  <h2>156</h2>
                  <span className="stat-positive">
                    ↑ 12% this month
                  </span>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon earnings-icon">
                  💰
                </div>

                <div>
                  <p>Total Earnings</p>
                  <h2>₹48,250</h2>
                  <span className="stat-positive">
                    ↑ 15% this month
                  </span>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon reviews-icon">
                  ⭐
                </div>

                <div>
                  <p>Reviews</p>
                  <h2>4.8</h2>
                  <span className="stat-positive">
                    ★ Excellent rating
                  </span>
                </div>

              </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="section-header">

              <div>
                <h2>Quick Actions</h2>
                <p>
                  Manage your store quickly
                </p>
              </div>

            </div>

            <div className="quick-actions">

              <button
                type="button"
                onClick={() =>
                  handleMenuClick("add-product")
                }
              >
                <span>➕</span>
                <strong>Add Product</strong>
                <small>
                  Add a new product
                </small>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleMenuClick("products")
                }
              >
                <span>🛍️</span>
                <strong>My Products</strong>
                <small>
                  Manage your products
                </small>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleMenuClick("orders")
                }
              >
                <span>📦</span>
                <strong>View Orders</strong>
                <small>
                  Check customer orders
                </small>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleMenuClick("reviews")
                }
              >
                <span>⭐</span>
                <strong>Reviews</strong>
                <small>
                  See customer reviews
                </small>
              </button>

            </div>

            {/* DASHBOARD GRID */}
            <div className="dashboard-grid">

              {/* RECENT ORDERS */}
              <div className="dashboard-card">

                <div className="card-header">

                  <div>
                    <h2>Recent Orders</h2>
                    <p>
                      Latest customer orders
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleMenuClick("orders")
                    }
                  >
                    View All
                  </button>

                </div>

                <div className="orders-list">

                  <div className="order-item">

                    <div className="order-product">

                      <div className="product-image">
                        💄
                      </div>

                      <div>
                        <strong>
                          Matte Lipstick
                        </strong>

                        <span>
                          Order #ORD1025
                        </span>
                      </div>

                    </div>

                    <div className="order-price">
                      ₹799
                    </div>

                    <span className="order-status delivered">
                      Delivered
                    </span>

                  </div>

                  <div className="order-item">

                    <div className="order-product">

                      <div className="product-image">
                        💅
                      </div>

                      <div>
                        <strong>
                          Nail Polish Set
                        </strong>

                        <span>
                          Order #ORD1024
                        </span>
                      </div>

                    </div>

                    <div className="order-price">
                      ₹599
                    </div>

                    <span className="order-status processing">
                      Processing
                    </span>

                  </div>

                  <div className="order-item">

                    <div className="order-product">

                      <div className="product-image">
                        🧴
                      </div>

                      <div>
                        <strong>
                          Face Serum
                        </strong>

                        <span>
                          Order #ORD1023
                        </span>
                      </div>

                    </div>

                    <div className="order-price">
                      ₹1,299
                    </div>

                    <span className="order-status shipped">
                      Shipped
                    </span>

                  </div>

                </div>

              </div>

              {/* TOP PRODUCTS */}
              <div className="dashboard-card">

                <div className="card-header">

                  <div>
                    <h2>Top Products</h2>
                    <p>
                      Best selling products
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleMenuClick("products")
                    }
                  >
                    View All
                  </button>

                </div>

                <div className="top-products">

                  <div className="top-product">

                    <div className="top-product-image">
                      💄
                    </div>

                    <div className="top-product-info">
                      <strong>
                        Matte Lipstick
                      </strong>

                      <span>
                        82 sales
                      </span>
                    </div>

                    <strong>
                      ₹799
                    </strong>

                  </div>

                  <div className="top-product">

                    <div className="top-product-image">
                      🧴
                    </div>

                    <div className="top-product-info">
                      <strong>
                        Face Serum
                      </strong>

                      <span>
                        64 sales
                      </span>
                    </div>

                    <strong>
                      ₹1,299
                    </strong>

                  </div>

                  <div className="top-product">

                    <div className="top-product-image">
                      💅
                    </div>

                    <div className="top-product-info">
                      <strong>
                        Nail Polish
                      </strong>

                      <span>
                        51 sales
                      </span>
                    </div>

                    <strong>
                      ₹599
                    </strong>

                  </div>

                </div>

              </div>

            </div>

            {/* REVIEWS */}
            <div className="dashboard-card reviews-card">

              <div className="card-header">

                <div>
                  <h2>Recent Reviews</h2>

                  <p>
                    What customers are saying
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleMenuClick("reviews")
                  }
                >
                  View All
                </button>

              </div>

              <div className="reviews-list">

                <div className="review-item">

                  <div className="review-avatar">
                    A
                  </div>

                  <div className="review-content">

                    <strong>
                      Anitha
                    </strong>

                    <div className="stars">
                      ★★★★★
                    </div>

                    <p>
                      Amazing product. Very good
                      quality and fast delivery.
                    </p>

                  </div>

                  <span>
                    2 hours ago
                  </span>

                </div>

                <div className="review-item">

                  <div className="review-avatar">
                    R
                  </div>

                  <div className="review-content">

                    <strong>
                      Rahul
                    </strong>

                    <div className="stars">
                      ★★★★☆
                    </div>

                    <p>
                      Good product and packaging.
                    </p>

                  </div>

                  <span>
                    5 hours ago
                  </span>

                </div>

              </div>

            </div>

          </section>
        )}

        {/* OTHER SECTIONS */}
        {activeMenu !== "dashboard" && (
          <section className="placeholder-page">

            <div className="placeholder-icon">
              {activeItem?.icon}
            </div>

            <h2>
              {activeItem?.label}
            </h2>

            <p>
              This section is ready to be
              connected with your backend API.
            </p>

          </section>
        )}

      </main>
    </div>
  );
}

export default Dashboard_seller;