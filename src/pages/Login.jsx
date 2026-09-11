import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (loading) {
      return;
    }

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const email = formData.email.trim().toLowerCase();

      console.log("Login request:", {
        email,
        password: "********",
      });

      const response = await login(
        email,
        formData.password
      );

      console.log("Login successful:", response);

      setError("");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      if (error.serverError) {
        setError(error.serverError);
        return;
      }

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your email and password.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Left Side */}
        <div className="auth-left">
          <div className="auth-brand">
            <span className="auth-logo-icon">🛍️</span>

            <span>
              My<span>Shop</span>
            </span>
          </div>

          <h1>Welcome Back!</h1>

          <p>
            Login to your account and continue shopping
            your favorite products.
          </p>

          <div className="auth-decoration">
            <div className="circle circle-one"></div>
            <div className="circle circle-two"></div>

            <span className="shopping-icon">🛒</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right">
          <div className="auth-card">

            <div className="auth-header">
              <h2>Login</h2>

              <p>
                Welcome back! Please enter your details.
              </p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <div className="password-label">
                  <label htmlFor="password">
                    Password
                  </label>

                  <Link to="/forgot-password">
                    Forgot Password?
                  </Link>
                </div>

                <div className="password-input">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="remember-row">
                <label className="remember">
                  <input
                    type="checkbox"
                    disabled={loading}
                  />

                  <span>
                    Remember me
                  </span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>

            {/* Register */}
            <div className="auth-switch">
              Don't have an account?{" "}
              <Link to="/register">
                Create Account
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;