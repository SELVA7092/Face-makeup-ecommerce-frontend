import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Seller
import Dashboard_Seller from "./pages/seller/Dashboard_seller.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= SELLER ROUTES ================= */}

        <Route
          path="/seller/dashboard"
          element={<Dashboard_Seller />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;