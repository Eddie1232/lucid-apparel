import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { StatusBar, BottomNav } from "./components/ui.jsx";
import Splash from "./pages/Splash.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Orders from "./pages/Orders.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";

const TAB_ROUTES = ["/home", "/shop", "/cart", "/wishlist", "/profile"];
const FULLSCREEN = ["/", "/login", "/register"];

export default function App() {
  const { pathname } = useLocation();
  const showTabs = TAB_ROUTES.includes(pathname) || pathname.startsWith("/product");
  const isFull = FULLSCREEN.includes(pathname);
  const darkStatus = pathname === "/";

  return (
    <div className="stage">
      <div className="device">
        <div className="device__screen">
          {!isFull && <StatusBar dark={darkStatus} />}
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          {showTabs && <BottomNav />}
        </div>
      </div>
    </div>
  );
}
