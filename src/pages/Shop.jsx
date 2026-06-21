import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { Stars } from "../components/ui.jsx";
import Garment from "../components/Garment.jsx";
import { products, categories } from "../data.js";
import { useShop } from "../store.jsx";

export default function Shop() {
  const navigate = useNavigate();
  const { wishlist, toggleWish } = useShop();
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <div className="screen">
      <div className="pad" style={{ paddingTop: 4 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 700 }}>Shop</h1>
          <button className="iconbtn iconbtn--ghost"><Icon name="search" size={20} /></button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12, overflowX: "auto" }}>
          {["All", ...categories.map((c) => c.name)].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="pill"
              style={{
                whiteSpace: "nowrap",
                padding: "8px 16px",
                background: cat === c ? "var(--ink)" : "#fff",
                color: cat === c ? "#fff" : "var(--text)",
                borderColor: cat === c ? "var(--ink)" : "var(--line-2)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll">
        <div className="pad" style={{ paddingTop: 16, paddingBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {filtered.map((p) => {
              const wished = wishlist.includes(p.id);
              return (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)}>
                  <div style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: 14, height: 150, display: "grid", placeItems: "center", padding: 10 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }}
                      style={{ position: "absolute", top: 10, right: 10, color: wished ? "var(--gold)" : "#c9c9c9" }}
                    >
                      <Icon name="heart" size={18} fill={wished} />
                    </button>
                    <div style={{ width: "70%" }}><Garment type={p.type} color={p.color} /></div>
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 8 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 14 }}>GHS {p.price}</span>
                    <Stars value={p.rating} size={11} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
