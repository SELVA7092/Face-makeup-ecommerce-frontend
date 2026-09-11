import axios from "axios";

// ========================================
// BACKEND BASE URL
// ========================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080/api";

// ========================================
// AXIOS INSTANCE
// ========================================

const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});

// ========================================
// REFRESH TOKEN STATE
// ========================================

let isRefreshing = false;

let refreshSubscribers = [];

// ========================================
// ADD REQUEST TO REFRESH QUEUE
// ========================================

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// ========================================
// REFRESH SUCCESS
// ========================================

const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => {
    callback(newAccessToken, null);
  });

  refreshSubscribers = [];
};

// ========================================
// REFRESH FAILED
// ========================================

const onRefreshFailed = (error) => {
  refreshSubscribers.forEach((callback) => {
    callback(null, error);
  });

  refreshSubscribers = [];
};

// ========================================
// REQUEST INTERCEPTOR
// ========================================

api.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = config.headers || {};

      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

api.interceptors.response.use(
  // ======================================
  // SUCCESS
  // ======================================

  (response) => {
    return response;
  },

  // ======================================
  // ERROR
  // ======================================

  async (error) => {
    const originalRequest = error.config;

    // ======================================
    // NETWORK ERROR
    // ======================================

    if (!error.response) {
      console.error(
        "❌ Backend server/network error:",
        error.message
      );

      error.serverError =
        "Server is not connected. Please start the backend server and try again.";

      return Promise.reject(error);
    }

    const status = error.response.status;

    // ======================================
    // REQUEST URL
    // ======================================

    const requestUrl =
      originalRequest?.url || "";

    // ======================================
    // AUTH REQUEST CHECKS
    // ======================================

    const isLoginRequest =
      requestUrl.includes("/auth/login");

    const isRegisterRequest =
      requestUrl.includes("/auth/register");

    const isRefreshRequest =
      requestUrl.includes("/auth/refresh");

    // ======================================
    // ONLY HANDLE 401
    // ======================================

    if (status !== 401) {
      console.error(
        "❌ API Error:",
        error.response?.data ||
          error.message
      );

      return Promise.reject(error);
    }

    // ======================================
    // LOGIN 401
    // ======================================

    if (isLoginRequest) {
      return Promise.reject(error);
    }

    // ======================================
    // REGISTER 401
    // ======================================

    if (isRegisterRequest) {
      return Promise.reject(error);
    }

    // ======================================
    // REFRESH API ITSELF FAILED
    // ======================================

    if (isRefreshRequest) {
      console.error(
        "❌ REFRESH TOKEN API FAILED"
      );

      console.error(
        "❌ Refresh token is invalid or expired."
      );

      console.error(
        "❌ Backend response:",
        error.response?.data
      );

      logout();

      return Promise.reject(error);
    }

    // ======================================
    // PREVENT INFINITE RETRY
    // ======================================

    if (
      !originalRequest ||
      originalRequest._retry
    ) {
      console.error(
        "❌ Request already retried."
      );

      return Promise.reject(error);
    }

    // ======================================
    // MARK REQUEST AS RETRIED
    // ======================================

    originalRequest._retry = true;

    // ======================================
    // GET REFRESH TOKEN
    // ======================================

    const refreshToken =
      localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error(
        "❌ No refresh token available."
      );

      logout();

      return Promise.reject(error);
    }

    // ======================================
    // ACCESS TOKEN EXPIRED
    // ======================================

    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "🔴 ACCESS TOKEN EXPIRED"
    );
    console.log(
      "========================================"
    );

    console.log(
      "🔑 Access token rejected with HTTP 401"
    );

    console.log(
      "🔄 Refresh token is available."
    );

    // ======================================
    // REFRESH ALREADY RUNNING
    // ======================================

    if (isRefreshing) {
      console.log(
        "⏳ Refresh token call already running..."
      );

      console.log(
        "⏳ Waiting for new access token..."
      );

      return new Promise(
        (resolve, reject) => {
          subscribeTokenRefresh(
            (
              newAccessToken,
              refreshError
            ) => {

              // ============================
              // REFRESH FAILED
              // ============================

              if (
                !newAccessToken ||
                refreshError
              ) {
                console.error(
                  "❌ Waiting refresh failed."
                );

                reject(
                  refreshError || error
                );

                return;
              }

              // ============================
              // SET NEW TOKEN
              // ============================

              originalRequest.headers =
                originalRequest.headers || {};

              originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

              console.log(
                "✅ New access token received."
              );

              console.log(
                "🔄 Retrying waiting request..."
              );

              // ============================
              // RETRY REQUEST
              // ============================

              resolve(
                api(originalRequest)
              );
            }
          );
        }
      );
    }

    // ======================================
    // START REFRESH
    // ======================================

    isRefreshing = true;

    try {

      // ====================================
      // BEFORE REFRESH API CALL
      // ====================================

      console.log("");
      console.log(
        "----------------------------------------"
      );

      console.log(
        "🔄 CALLING REFRESH TOKEN API"
      );

      console.log(
        "----------------------------------------"
      );

      console.log(
        "📍 URL:",
        `${API_BASE_URL}/auth/refresh`
      );

      console.log(
        "📤 Sending refresh token to backend..."
      );

      console.log(
        "📤 Refresh Token:",
        refreshToken
      );

      console.log(
        "⏳ Waiting for backend response..."
      );

      // ====================================
      // REFRESH TOKEN API CALL
      // ====================================

      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh`,

        {
          refreshToken: refreshToken,
        },

        {
          headers: {
            "Content-Type":
              "application/json",
          },

          timeout: 15000,
        }
      );

      // ====================================
      // AFTER REFRESH API CALL
      // ====================================

      console.log("");
      console.log(
        "----------------------------------------"
      );

      console.log(
        "📥 REFRESH TOKEN API RESPONSE RECEIVED"
      );

      console.log(
        "----------------------------------------"
      );

      console.log(
        "✅ Refresh API HTTP Status:",
        response.status
      );

      console.log(
        "📥 Backend response:",
        response.data
      );

      // ====================================
      // RESPONSE DATA
      // ====================================

      const data = response.data;

      // ====================================
      // CHECK NEW ACCESS TOKEN
      // ====================================

      if (!data.accessToken) {
        console.error(
          "❌ Backend did not return new access token."
        );

        throw new Error(
          "New access token was not received."
        );
      }

      // ====================================
      // SAVE NEW ACCESS TOKEN
      // ====================================

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      console.log(
        "✅ NEW ACCESS TOKEN RECEIVED"
      );

      console.log(
        "💾 New access token saved to localStorage."
      );

      // ====================================
      // SAVE NEW REFRESH TOKEN
      // ====================================

      if (data.refreshToken) {

        localStorage.setItem(
          "refreshToken",
          data.refreshToken
        );

        console.log(
          "🔄 NEW REFRESH TOKEN RECEIVED"
        );

        console.log(
          "💾 New refresh token saved to localStorage."
        );

      } else {

        console.log(
          "ℹ️ Backend did not return a new refresh token."
        );

        console.log(
          "ℹ️ Existing refresh token will remain."
        );
      }

      // ====================================
      // UPDATE USER DATA
      // ====================================

      const oldUser =
        localStorage.getItem("user");

      let user = null;

      if (oldUser) {
        try {
          user = JSON.parse(oldUser);
        } catch (parseError) {
          console.warn(
            "⚠️ Stored user data is invalid."
          );

          user = null;
        }
      }

      const updatedUser = {
        userId:
          data.userId ??
          user?.userId ??
          null,

        name:
          data.name ??
          user?.name ??
          null,

        email:
          data.email ??
          user?.email ??
          null,

        phone:
          data.phone ??
          user?.phone ??
          null,

        role:
          data.role ??
          user?.role ??
          null,
      };

      // ====================================
      // SAVE USER DATA
      // ====================================

      if (
        updatedUser.userId ||
        updatedUser.email ||
        updatedUser.name
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );
      }

      // ====================================
      // REFRESH SUCCESS
      // ====================================

      console.log("");
      console.log(
        "========================================"
      );

      console.log(
        "✅ REFRESH TOKEN SUCCESS"
      );

      console.log(
        "========================================"
      );

      console.log(
        "🔑 Access token has been refreshed."
      );

      console.log(
        "🔄 Refresh token has been updated."
      );

      // ====================================
      // STOP REFRESH LOCK
      // ====================================

      isRefreshing = false;

      // ====================================
      // RELEASE WAITING REQUESTS
      // ====================================

      onRefreshed(data.accessToken);

      // ====================================
      // UPDATE ORIGINAL REQUEST
      // ====================================

      originalRequest.headers =
        originalRequest.headers || {};

      originalRequest.headers.Authorization =
        `Bearer ${data.accessToken}`;

      // ====================================
      // RETRY ORIGINAL REQUEST
      // ====================================

      console.log(
        "🔄 Retrying original API request..."
      );

      const retryResponse =
        await api(originalRequest);

      console.log(
        "✅ Original API request successful after refresh."
      );

      console.log("");

      return retryResponse;

    } catch (refreshError) {

      // ====================================
      // REFRESH FAILED
      // ====================================

      console.error("");
      console.error(
        "========================================"
      );

      console.error(
        "❌ REFRESH TOKEN CALL FAILED"
      );

      console.error(
        "========================================"
      );

      console.error(
        "❌ Error:",
        refreshError.message
      );

      console.error(
        "❌ Backend response:",
        refreshError.response?.data
      );

      console.error(
        "❌ HTTP status:",
        refreshError.response?.status
      );

      // ====================================
      // STOP REFRESH LOCK
      // ====================================

      isRefreshing = false;

      // ====================================
      // REJECT WAITING REQUESTS
      // ====================================

      onRefreshFailed(refreshError);

      // ====================================
      // LOGOUT
      // ====================================

      console.error(
        "🚪 Refresh failed. Logging out..."
      );

      logout();

      return Promise.reject(
        refreshError
      );
    }
  }
);

// ========================================
// LOGOUT
// ========================================

export const logout = () => {

  console.log(
    "🚪 Logging out..."
  );

  // ======================================
  // REMOVE ACCESS TOKEN
  // ======================================

  localStorage.removeItem(
    "accessToken"
  );

  // ======================================
  // REMOVE REFRESH TOKEN
  // ======================================

  localStorage.removeItem(
    "refreshToken"
  );

  // ======================================
  // REMOVE USER
  // ======================================

  localStorage.removeItem(
    "user"
  );

  // ======================================
  // RESET REFRESH STATE
  // ======================================

  isRefreshing = false;

  refreshSubscribers = [];

  // ======================================
  // REDIRECT
  // ======================================

  window.location.href = "/login";
};

// ========================================
// EXPORT
// ========================================

export default api;