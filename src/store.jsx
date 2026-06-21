/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { products } from "./data.js";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([
    { id: "premium-oversized-tee", size: "M", color: "black", qty: 1 },
    { id: "essentials-hoodie", size: "L", color: "beige", qty: 1 },
  ]);
  const [wishlist, setWishlist] = useState([
    "minimal-black-hoodie",
    "essential-white-tee",
    "cargo-pants",
  ]);

  const addToCart = (id, size, color) =>
    setCart((prev) => {
      const i = prev.findIndex((x) => x.id === id && x.size === size && x.color === color);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { id, size, color, qty: 1 }];
    });

  const changeQty = (idx, delta) =>
    setCart((prev) =>
      prev
        .map((x, i) => (i === idx ? { ...x, qty: x.qty + delta } : x))
        .filter((x) => x.qty > 0)
    );

  const removeFromCart = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));

  const toggleWish = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const cartCount = cart.reduce((n, x) => n + x.qty, 0);
  const productById = (id) => products.find((p) => p.id === id);

  const value = useMemo(
    () => ({ cart, wishlist, addToCart, changeQty, removeFromCart, toggleWish, cartCount, productById }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart, wishlist]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
