import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";
import Garment from "../components/Garment.jsx";
import { colorLabel } from "../data.js";
import { useShop } from "../store.jsx";

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, productById, toggleWish, addToCart } = useShop();
  const items = wishlist.map((id) => productById(id)).filter(Boolean);

  return (
    <div className="screen screen--white">
      <TopBar title="My Wishlist" />
      <div className="scroll">
        <div className="pad" style={{ paddingBottom: 20 }}>
          {items.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: 60 }}>Your wishlist is empty.</p>
          )}
          {items.map((p) => (
            <div key={p.id} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
              <div onClick={() => navigate(`/product/${p.id}`)} style={{ width: 72, height: 84, background: "var(--bg-soft)", borderRadius: 12, display: "grid", placeItems: "center" }}>
                <div style={{ width: "76%" }}><Garment type={p.type} color={p.color} /></div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                  <button style={{ color: "var(--gold)" }} onClick={() => toggleWish(p.id)}><Icon name="heart" size={20} fill /></button>
                </div>
                <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: 14, margin: "4px 0 2px" }}>GHS {p.price}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 10 }}>
                  Size {p.sizes[1] || p.sizes[0]} · {colorLabel[p.color]}
                </div>
                <button
                  onClick={() => addToCart(p.id, p.sizes[1] || p.sizes[0], p.color)}
                  style={{ border: "1px solid var(--ink)", borderRadius: 8, padding: "8px 16px", fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
