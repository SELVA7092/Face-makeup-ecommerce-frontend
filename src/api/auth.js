import api from "./api";

// ========================================
// REGISTER
// ========================================

export const register = async (userData) => {
  try {
    const response = await api.post(
      "/auth/register",
      userData
    );

    const data = response.data;

    // ======================================
    // SAVE ACCESS TOKEN
    // ======================================

    if (data.accessToken) {
      localStorage.setItem(
        "accessToken",
        data.accessToken
      );
    }

    // ======================================
    // SAVE REFRESH TOKEN
    // ======================================

    if (data.refreshToken) {
      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );
    }

    // ======================================
    // SAVE USER INFORMATION
    // ======================================

    const user = {
      userId: data.userId ?? null,
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      role: data.role ?? "",
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    console.log(
      "Registration successful."
    );

    return data;

  } catch (error) {
    console.error(
      "Registration error:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
};


// ========================================
// LOGIN
// ========================================

export const login = async (
  email,
  password
) => {
  try {
    const response = await api.post(
      "/auth/login",
      {
        email: email.trim().toLowerCase(),
        password,
      }
    );

    const data = response.data;

    // ======================================
    // SAVE ACCESS TOKEN
    // ======================================

    if (data.accessToken) {
      localStorage.setItem(
        "accessToken",
        data.accessToken
      );
    }

    // ======================================
    // SAVE REFRESH TOKEN
    // ======================================

    if (data.refreshToken) {
      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );
    }

    // ======================================
    // SAVE USER INFORMATION
    // ======================================

    const user = {
      userId: data.userId ?? null,
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      role: data.role ?? "",
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    console.log(
      "Login successful."
    );

    return data;

  } catch (error) {
    console.error(
      "Login error:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
};


// ========================================
// GET CURRENT USER
// ========================================

export const getCurrentUser = () => {
  const user =
    localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);

  } catch (error) {
    console.error(
      "Invalid user data:",
      error
    );

    localStorage.removeItem("user");

    return null;
  }
};


// ========================================
// CHECK AUTHENTICATION
// ========================================

export const isAuthenticated = () => {
  const accessToken =
    localStorage.getItem(
      "accessToken"
    );

  const refreshToken =
    localStorage.getItem(
      "refreshToken"
    );

  // User is considered authenticated
  // when at least the access token exists.
  //
  // If access token expires, api.js
  // automatically uses refreshToken.

  return !!accessToken || !!refreshToken;
};


// ========================================
// GET ACCESS TOKEN
// ========================================

export const getAccessToken = () => {
  return localStorage.getItem(
    "accessToken"
  );
};


// ========================================
// GET REFRESH TOKEN
// ========================================

export const getRefreshToken = () => {
  return localStorage.getItem(
    "refreshToken"
  );
};


// ========================================
// GET USER ROLE
// ========================================

export const getUserRole = () => {
  const user =
    getCurrentUser();

  return user?.role || null;
};


// ========================================
// UPDATE STORED USER
// ========================================

export const updateStoredUser = (
  userData
) => {
  const currentUser =
    getCurrentUser();

  const updatedUser = {
    ...(currentUser || {}),
    ...userData,
  };

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  return updatedUser;
};


// ========================================
// UPDATE STORED TOKENS
// ========================================

export const updateTokens = ({
  accessToken,
  refreshToken,
}) => {
  // ======================================
  // ACCESS TOKEN
  // ======================================

  if (accessToken) {
    localStorage.setItem(
      "accessToken",
      accessToken
    );
  }

  // ======================================
  // REFRESH TOKEN
  // ======================================

  if (refreshToken) {
    localStorage.setItem(
      "refreshToken",
      refreshToken
    );
  }
};


// ========================================
// CLEAR AUTH DATA
// ========================================

export const clearAuthData = () => {
  localStorage.removeItem(
    "accessToken"
  );

  localStorage.removeItem(
    "refreshToken"
  );

  localStorage.removeItem(
    "user"
  );
};


// ========================================
// LOGOUT
// ========================================

export const logout = () => {
  console.log(
    "Logging out..."
  );

  clearAuthData();

  window.location.href =
    "/login";
};


// ========================================
// CHECK IF USER HAS ROLE
// ========================================

export const hasRole = (role) => {
  const user =
    getCurrentUser();

  if (!user?.role || !role) {
    return false;
  }

  return (
    user.role.toUpperCase() ===
    role.toUpperCase()
  );
};


// ========================================
// CHECK IF USER IS ADMIN
// ========================================

export const isAdmin = () => {
  return hasRole("ADMIN");
};


// ========================================
// CHECK IF USER IS SELLER
// ========================================

export const isSeller = () => {
  return hasRole("SELLER");
};


// ========================================
// CHECK IF USER IS NORMAL USER
// ========================================

export const isUser = () => {
  return hasRole("USER");
};