import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import Categories from "./pages/Categories";
 import Login from "./pages/Login";
 import Register from "./pages/Register";
 import Profile from "./pages/Profile";

// // User
// import UserDashboard from "./pages/user/Dashboard";
// import Profile from "./pages/user/Profile";
// import Cart from "./pages/user/Cart";
// import Wishlist from "./pages/user/Wishlist";
// import Checkout from "./pages/user/Checkout";
// import UserOrders from "./pages/user/Orders";

// // Seller
// import SellerDashboard from "./pages/seller/Dashboard";
// import SellerProducts from "./pages/seller/Products";
// import AddProduct from "./pages/seller/AddProduct";
// import EditProduct from "./pages/seller/EditProduct";
// import SellerOrders from "./pages/seller/Orders";
// import Sales from "./pages/seller/Sales";

// // Admin
// import AdminDashboard from "./pages/admin/Dashboard";
// import Users from "./pages/admin/Users";
// import Sellers from "./pages/admin/Sellers";
// import AdminProducts from "./pages/admin/Products";
// import AdminOrders from "./pages/admin/Orders";
// import AdminCategories from "./pages/admin/Categories";
// import Reports from "./pages/admin/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;