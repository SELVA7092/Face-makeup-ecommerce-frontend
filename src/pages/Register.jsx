import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  // ========================================
  // FORM DATA
  // ========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  // ========================================
  // UI STATE
  // ========================================

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear previous error
    setError("");
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear old error
    setError("");

    // ======================================
    // REQUIRED FIELD VALIDATION
    // ======================================

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // ======================================
    // NAME VALIDATION
    // ======================================

    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    // ======================================
    // EMAIL VALIDATION
    // ======================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // ======================================
    // PHONE VALIDATION
    // ======================================

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(formData.phone.trim())) {
      setError(
        "Phone number must contain exactly 10 digits."
      );
      return;
    }

    // ======================================
    // PASSWORD LENGTH
    // ======================================

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    // ======================================
    // PASSWORD MATCH
    // ======================================

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    // ======================================
    // PREVENT DOUBLE SUBMIT
    // ======================================

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      // ====================================
      // DATA SENT TO BACKEND
      // ====================================

      const userData = {
        name: formData.name.trim(),

        email: formData.email
          .trim()
          .toLowerCase(),

        phone: formData.phone.trim(),

        password: formData.password,

        // Convert role to uppercase
        //
        // "user"   → "USER"
        // "seller" → "SELLER"
        //
        role: formData.role.toUpperCase(),
      };

      // ====================================
      // DEBUG
      // ====================================

      console.log("Register request:", {
        ...userData,
        password: "********",
      });

      // ====================================
      // CALL REGISTER API
      // ====================================

      const response = await register(userData);

      console.log(
        "Registration successful:",
        response
      );

      // ====================================
      // SUCCESS
      // ====================================

      setError("");

      /*
       * Registration successful.
       *
       * Go to Home page.
       */

      navigate("/");

    } catch (error) {
      // ====================================
      // REGISTRATION ERROR
      // ====================================

      console.error(
        "Registration error:",
        error
      );

      // ====================================
      // SERVER NOT CONNECTED
      // ====================================

      if (error.serverError) {
        setError(error.serverError);
        return;
      }

      // ====================================
      // BACKEND ERROR
      // ====================================

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";

      setError(message);

    } finally {
      // ====================================
      // STOP LOADING
      // ====================================

      setLoading(false);
    }
  };

  // ========================================
  // JSX
  // ========================================

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* =====================================
            LEFT SIDE
        ====================================== */}

        <div className="auth-left register-left">

          {/* BRAND */}

          <div className="auth-brand">

            <span className="auth-logo-icon">
              🛍️
            </span>

            <span>
              My<span>Shop</span>
            </span>

          </div>

          {/* TITLE */}

          <h1>Join MyShop</h1>

          <p>
            Create your account and start shopping
            amazing products today.
          </p>

          {/* FEATURES */}

          <div className="auth-features">

            <div className="auth-feature">
              <span>✓</span>

              <p>
                Thousands of products
              </p>
            </div>

            <div className="auth-feature">
              <span>✓</span>

              <p>
                Secure shopping
              </p>
            </div>

            <div className="auth-feature">
              <span>✓</span>

              <p>
                Fast delivery
              </p>
            </div>

            <div className="auth-feature">
              <span>✓</span>

              <p>
                Easy returns
              </p>
            </div>

          </div>

        </div>

        {/* =====================================
            RIGHT SIDE
        ====================================== */}

        <div className="auth-right">

          <div className="auth-card register-card">

            {/* HEADER */}

            <div className="auth-header">

              <h2>
                Create Account
              </h2>

              <p>
                Fill in your details to create
                your account.
              </p>

            </div>

            {/* =================================
                ERROR MESSAGE
            ================================== */}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {/* =================================
                FORM
            ================================== */}

            <form onSubmit={handleSubmit}>

              {/* =================================
                  NAME
              ================================== */}

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  disabled={loading}
                />

              </div>

              {/* =================================
                  EMAIL
              ================================== */}

              <div className="form-group">

                <label htmlFor="register-email">
                  Email Address
                </label>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loading}
                />

              </div>

              {/* =================================
                  PHONE
              ================================== */}

              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  disabled={loading}
                />

              </div>

              {/* =================================
                  ACCOUNT TYPE
              ================================== */}

              <div className="form-group">

                <label>
                  Account Type
                </label>

                <div className="role-options">

                  {/* ===============================
                      CUSTOMER
                  ================================ */}

                  <label
                    className={
                      formData.role === "user"
                        ? "role-option selected"
                        : "role-option"
                    }
                  >

                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={
                        formData.role === "user"
                      }
                      onChange={handleChange}
                      disabled={loading}
                    />

                    <span className="role-icon">
                      👤
                    </span>

                    <span>

                      <strong>
                        Customer
                      </strong>

                      <small>
                        Buy products
                      </small>

                    </span>

                  </label>

                  {/* ===============================
                      SELLER
                  ================================ */}

                  <label
                    className={
                      formData.role === "seller"
                        ? "role-option selected"
                        : "role-option"
                    }
                  >

                    <input
                      type="radio"
                      name="role"
                      value="seller"
                      checked={
                        formData.role === "seller"
                      }
                      onChange={handleChange}
                      disabled={loading}
                    />

                    <span className="role-icon">
                      🏪
                    </span>

                    <span>

                      <strong>
                        Seller
                      </strong>

                      <small>
                        Sell products
                      </small>

                    </span>

                  </label>

                </div>

              </div>

              {/* =================================
                  PASSWORD
              ================================== */}

              <div className="form-group">

                <label htmlFor="register-password">
                  Password
                </label>

                <div className="password-input">

                  <input
                    id="register-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

              </div>

              {/* =================================
                  CONFIRM PASSWORD
              ================================== */}

              <div className="form-group">

                <label htmlFor="confirm-password">
                  Confirm Password
                </label>

                <div className="password-input">

                  <input
                    id="confirm-password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

              </div>

              {/* =================================
                  TERMS
              ================================== */}

              <label className="terms">

                <input
                  type="checkbox"
                  required
                  disabled={loading}
                />

                <span>
                  I agree to{" "}
                  <Link to="/terms">
                    Terms & Conditions
                  </Link>
                </span>

              </label>

              {/* =================================
                  SUBMIT
              ================================== */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

              </button>

            </form>

            {/* =================================
                LOGIN
            ================================== */}

            <div className="auth-switch">

              Already have an account?
              {" "}

              <Link to="/login">
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;
