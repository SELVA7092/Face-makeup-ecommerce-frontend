import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Invalid user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    closeMobileMenu();
  };

  const handleDashboard = () => {
    const role = user?.role?.toUpperCase();

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "SELLER") {
      navigate("/seller/dashboard");
    } else if (role === "USER") {
      navigate("/user/dashboard");
    }

    closeMobileMenu();
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const mobileNavLinkClass = ({ isActive }) =>
    isActive ? "mobile-nav-link active" : "mobile-nav-link";

  const showDashboard =
    user &&
    ["ADMIN", "SELLER"].includes(
      user.role?.toUpperCase()
    );

  return (
    <header className="header">
      <div className="header-container">

        <Link
          to="/"
          className="logo"
          onClick={closeMobileMenu}
        >
          <span className="logo-icon">🛍️</span>

          <span className="logo-text">
            My<span>Shop</span>
          </span>
        </Link>

        <nav className="desktop-nav">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
          />

          <button type="button" aria-label="Search">
            🔍
          </button>
        </div>

        <div className="header-actions">

          <Link to="/cart" className="cart-button">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            <span className="cart-count">0</span>
          </Link>

          {user ? (
            <>
              <span className="user-role">
                {user.role?.toUpperCase()}
              </span>

              {showDashboard && (
                <button
                  type="button"
                  className="dashboard-button"
                  onClick={handleDashboard}
                >
                  Dashboard
                </button>
              )}

              <button
                type="button"
                className="profile-button"
                onClick={handleProfile}
                aria-label="Profile"
                title="Profile"
              >
                👤
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="login-button"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-button"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() =>
            setMobileMenuOpen(
              (previous) => !previous
            )
          }
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">

          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={mobileNavLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMobileMenu}
            className={mobileNavLinkClass}
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMobileMenu}
            className={mobileNavLinkClass}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMobileMenu}
            className={mobileNavLinkClass}
          >
            Contact
          </NavLink>

          <div className="mobile-actions">

            <Link
              to="/cart"
              className="mobile-cart"
              onClick={closeMobileMenu}
            >
              🛒 Cart <span>0</span>
            </Link>

            {user ? (
              <>
                <div className="mobile-user-role">
                  👤 {user.role?.toUpperCase()}
                </div>

                {showDashboard && (
                  <button
                    type="button"
                    className="mobile-dashboard"
                    onClick={handleDashboard}
                  >
                    📊 Dashboard
                  </button>
                )}

                <button
                  type="button"
                  className="mobile-profile"
                  onClick={handleProfile}
                >
                  👤 Profile
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mobile-login"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="mobile-register"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;