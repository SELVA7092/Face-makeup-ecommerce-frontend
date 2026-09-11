import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { logout } from "../api/api";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ========================================
  // LOAD USER
  // ========================================

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);

        setFormData({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Invalid user data:", error);
        setUser(null);
      }
    }
  };

  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ========================================
  // EDIT PROFILE
  // ========================================

  const handleEdit = () => {
    setError("");
    setSuccess("");

    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
      confirmPassword: "",
    });

    setEditMode(true);
  };

  // ========================================
  // CANCEL EDIT
  // ========================================

  const handleCancel = () => {
    setEditMode(false);
    setError("");
    setSuccess("");

    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
      confirmPassword: "",
    });
  };

  // ========================================
  // VALIDATE FORM
  // ========================================

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return false;
    }

    if (formData.name.trim().length < 2) {
      setError(
        "Name must contain at least 2 characters."
      );
      return false;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError(
        "Please enter a valid email address."
      );
      return false;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(formData.phone.trim())) {
      setError(
        "Please enter a valid 10-digit phone number."
      );
      return false;
    }

    // Password is optional
    if (formData.password) {
      if (formData.password.length < 6) {
        setError(
          "New password must contain at least 6 characters."
        );
        return false;
      }

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        setError("Passwords do not match.");
        return false;
      }
    }

    return true;
  };

  // ========================================
  // UPDATE PROFILE
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (loading) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
      };

      // Password is optional
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await api.put(
        "/user/profile",
        updateData
      );

      console.log(
        "Profile update response:",
        response.data
      );

      // Backend response:
      // {
      //   success: true,
      //   message: "...",
      //   data: {
      //     userId,
      //     name,
      //     email,
      //     phone,
      //     role
      //   }
      // }

      const responseData = response.data;
      const updatedData = responseData.data;

      console.log("Updated data:", updatedData);

      const updatedUser = {
        userId:
          updatedData?.userId ??
          user.userId,

        name:
          updatedData?.name ??
          updateData.name,

        email:
          updatedData?.email ??
          updateData.email,

        phone:
          updatedData?.phone ??
          updateData.phone,

        role:
          updatedData?.role ??
          user.role,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        password: "",
        confirmPassword: "",
      });

      setSuccess(
        "Profile updated successfully."
      );

      setEditMode(false);
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      if (error.serverError) {
        setError(error.serverError);
        return;
      }

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update profile. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    logout();
  };

  // ========================================
  // USER NOT FOUND
  // ========================================

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <div className="empty-icon">
            👤
          </div>

          <h2>Profile Not Found</h2>

          <p>
            Please login to view your profile.
          </p>

          <Link
            to="/login"
            className="profile-login-button"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  // ========================================
  // ROLE
  // ========================================

  const role = user.role?.toUpperCase();

  // ========================================
  // UI
  // ========================================

  return (
    <div className="profile-page">

      {/* ====================================
          TOP SECTION
      ==================================== */}

      <div className="profile-top">
        <div>
          <Link
            to="/"
            className="profile-back"
          >
            ← Back to Home
          </Link>

          <h1>My Profile</h1>

          <p>
            Manage your account information
          </p>
        </div>
      </div>

      {/* ====================================
          PROFILE CONTAINER
      ==================================== */}

      <div className="profile-container">
        <div className="profile-card">

          {/* ==================================
              COVER
          ================================== */}

          <div className="profile-cover">
            <div className="profile-avatar">
              {user.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>
          </div>

          {/* ==================================
              PROFILE CONTENT
          ================================== */}

          <div className="profile-content">

            {/* =================================
                ERROR MESSAGE
            ================================= */}

            {error && (
              <div className="profile-message profile-error">
                <span>⚠️</span>

                <span>
                  {error}
                </span>
              </div>
            )}

            {/* =================================
                SUCCESS MESSAGE
            ================================= */}

            {success && (
              <div className="profile-message profile-success">
                <span>✓</span>

                <span>
                  {success}
                </span>
              </div>
            )}

            {/* =================================
                VIEW MODE
            ================================= */}

            {!editMode ? (
              <>
                <div className="profile-heading">
                  <div>
                    <h2>
                      {user.name || "User"}
                    </h2>

                    <p>
                      {user.email ||
                        "No email available"}
                    </p>
                  </div>

                  <span className="profile-role">
                    {role || "USER"}
                  </span>
                </div>

                <div className="profile-divider"></div>

                {/* ==============================
                    ACCOUNT INFORMATION
                ============================== */}

                <div className="profile-section">
                  <h3>
                    Account Information
                  </h3>

                  <div className="profile-details">

                    {/* NAME */}

                    <div className="profile-detail">
                      <div className="detail-icon">
                        👤
                      </div>

                      <div className="detail-info">
                        <span className="detail-label">
                          Full Name
                        </span>

                        <span className="detail-value">
                          {user.name ||
                            "Not available"}
                        </span>
                      </div>
                    </div>

                    {/* EMAIL */}

                    <div className="profile-detail">
                      <div className="detail-icon">
                        ✉️
                      </div>

                      <div className="detail-info">
                        <span className="detail-label">
                          Email Address
                        </span>

                        <span className="detail-value">
                          {user.email ||
                            "Not available"}
                        </span>
                      </div>
                    </div>

                    {/* PHONE */}

                    <div className="profile-detail">
                      <div className="detail-icon">
                        📱
                      </div>

                      <div className="detail-info">
                        <span className="detail-label">
                          Phone Number
                        </span>

                        <span className="detail-value">
                          {user.phone ||
                            "Not available"}
                        </span>
                      </div>
                    </div>

                    {/* ROLE */}

                    <div className="profile-detail">
                      <div className="detail-icon">
                        🛡️
                      </div>

                      <div className="detail-info">
                        <span className="detail-label">
                          Account Type
                        </span>

                        <span className="detail-value">
                          {role || "USER"}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* =================================
                    ACTIONS
                ================================= */}

                <div className="profile-actions">

                  <button
                    type="button"
                    className="profile-edit-button"
                    onClick={handleEdit}
                  >
                    ✏️ Edit Profile
                  </button>

                  <Link
                    to="/"
                    className="profile-home-button"
                  >
                    🏠 Home
                  </Link>

                  <button
                    type="button"
                    className="profile-logout-button"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>

                </div>
              </>
            ) : (

              /* =================================
                 EDIT MODE
              ================================= */

              <>
                <div className="profile-edit-header">
                  <div>
                    <h2>
                      Edit Profile
                    </h2>

                    <p>
                      Update your account
                      information
                    </p>
                  </div>

                  <span className="profile-role">
                    {role || "USER"}
                  </span>
                </div>

                <div className="profile-divider"></div>

                <form
                  className="profile-edit-form"
                  onSubmit={handleSubmit}
                >

                  {/* ============================
                      PERSONAL INFORMATION
                  ============================ */}

                  <div className="edit-section">

                    <h3>
                      Personal Information
                    </h3>

                    {/* NAME */}

                    <div className="edit-form-group">
                      <label htmlFor="name">
                        Full Name
                      </label>

                      <div className="edit-input-wrapper">
                        <span className="edit-input-icon">
                          👤
                        </span>

                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          autoComplete="name"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* EMAIL */}

                    <div className="edit-form-group">
                      <label htmlFor="email">
                        Email Address
                      </label>

                      <div className="edit-input-wrapper">
                        <span className="edit-input-icon">
                          ✉️
                        </span>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          autoComplete="email"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* PHONE */}

                    <div className="edit-form-group">
                      <label htmlFor="phone">
                        Phone Number
                      </label>

                      <div className="edit-input-wrapper">
                        <span className="edit-input-icon">
                          📱
                        </span>

                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter 10-digit phone number"
                          maxLength="10"
                          autoComplete="tel"
                          disabled={loading}
                        />
                      </div>
                    </div>

                  </div>

                  <div className="profile-divider"></div>

                  {/* ============================
                      PASSWORD
                  ============================ */}

                  <div className="edit-section">

                    <div className="password-section-header">
                      <div>
                        <h3>
                          Change Password
                        </h3>

                        <p>
                          Leave these fields empty
                          if you don't want to
                          change your password.
                        </p>
                      </div>

                      <span className="password-security-icon">
                        🔐
                      </span>
                    </div>

                    {/* NEW PASSWORD */}

                    <div className="edit-form-group">
                      <label htmlFor="password">
                        New Password
                      </label>

                      <div className="edit-input-wrapper">
                        <span className="edit-input-icon">
                          🔒
                        </span>

                        <input
                          id="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter new password"
                          autoComplete="new-password"
                          disabled={loading}
                        />

                        <button
                          type="button"
                          className="edit-password-toggle"
                          onClick={() =>
                            setShowPassword(
                              (previous) =>
                                !previous
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

                    {/* CONFIRM PASSWORD */}

                    <div className="edit-form-group">
                      <label htmlFor="confirmPassword">
                        Confirm New Password
                      </label>

                      <div className="edit-input-wrapper">
                        <span className="edit-input-icon">
                          🔐
                        </span>

                        <input
                          id="confirmPassword"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          name="confirmPassword"
                          value={
                            formData.confirmPassword
                          }
                          onChange={handleChange}
                          placeholder="Confirm new password"
                          autoComplete="new-password"
                          disabled={loading}
                        />

                        <button
                          type="button"
                          className="edit-password-toggle"
                          onClick={() =>
                            setShowConfirmPassword(
                              (previous) =>
                                !previous
                            )
                          }
                          disabled={loading}
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword
                            ? "🙈"
                            : "👁️"}
                        </button>
                      </div>
                    </div>

                    <div className="password-hint">
                      🔒 Password must contain at
                      least 6 characters.
                    </div>

                  </div>

                  {/* ============================
                      EDIT ACTIONS
                  ============================ */}

                  <div className="profile-edit-actions">

                    <button
                      type="button"
                      className="profile-cancel-button"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="profile-save-button"
                      disabled={loading}
                    >
                      {loading
                        ? "Saving..."
                        : "✓ Save Changes"}
                    </button>

                  </div>

                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;