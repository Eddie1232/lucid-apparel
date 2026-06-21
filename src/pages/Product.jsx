import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { Stars } from "../components/ui.jsx";
import Garment from "../components/Garment.jsx";
import { colorHex } from "../data.js";
import { useShop } from "../store.jsx";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productById, addToCart, wishlist, toggleWish, cartCount } = useShop();
  const p = productById(id);
  const [size, setSize] = useState(p?.sizes?.[1] || p?.sizes?.[0]);
  const [color, setColor] = useState(p?.color);
  const [added, setAdded] = useState(false);

  if (!p) return <div className="screen" style={{ padding: 24 }}>Product not found.</div>;
  const wished = wishlist.includes(p.id);

  const handleAdd = () => {
    addToCart(p.id, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="screen screen--white">
      <div className="scroll">
        {/* hero */}
        <div style={{ position: "relative", background: "linear-gradient(180deg,#f5f3ef,#eceae4)", padding: "10px 18px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="iconbtn" style={{ background: "#fff" }} onClick={() => navigate(-1)}><Icon name="back" size={20} /></button>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="iconbtn" style={{ background: "#fff", color: wished ? "var(--gold)" : "var(--ink)" }} onClick={() => toggleWish(p.id)}>
                <Icon name="heart" size={20} fill={wished} />
              </button>
              <button className="iconbtn" style={{ background: "#fff", position: "relative" }} onClick={() => navigate("/cart")}>
                <Icon name="bag" size={20} />
                {cartCount > 0 && <span className="tab__badge" style={{ top: 0, right: 0 }}>{cartCount}</span>}
              </button>
            </div>
          </div>
          <div style={{ height: 230, display: "grid", placeItems: "center", marginTop: 6 }}>
            <div style={{ width: "62%" }}>
              <Garment type={p.type} color={color} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 6 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={{ width: i === 0 ? 16 : 6, height: 6, borderRadius: 4, background: i === 0 ? "var(--gold)" : "#cfcdc7" }} />
            ))}
          </div>
        </div>

        <div className="pad" style={{ paddingTop: 18, paddingBottom: 20 }}>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 700 }}>{p.name}</h1>
          <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: 20, marginTop: 6 }}>GHS {p.price}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <Stars value={p.rating} />
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>({p.reviews} Reviews)</span>
          </div>

          <h4 style={{ marginTop: 22, marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Size</h4>
          <div style={{ display: "flex", gap: 10 }}>
            {p.sizes.map((s) => (
              <button key={s} className={`pill ${size === s ? "active" : ""}`} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>

          <h4 style={{ marginTop: 22, marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Color</h4>
          <div style={{ display: "flex", gap: 12 }}>
            {p.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: colorHex[c],
                  border: c === "white" ? "1px solid #ddd" : "none",
                  outline: color === c ? "2px solid var(--ink)" : "none",
                  outlineOffset: 2,
                }}
              />
            ))}
          </div>

          <h4 style={{ marginTop: 22, marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Description</h4>
          <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.6 }}>{p.desc}</p>
        </div>
      </div>

      <div style={{ padding: "12px 18px", borderTop: "1px solid var(--line)", background: "#fff" }}>
        <button className="btn btn--gold" onClick={handleAdd}>
          <Icon name={added ? "check" : "cart"} size={19} />
          {added ? "ADDED TO CART" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
