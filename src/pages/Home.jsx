import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import Garment, { COLORS } from "../components/Garment.jsx";
import { products, categories } from "../data.js";
import { useShop } from "../store.jsx";

function FeaturedCard({ label, sub, color, onClick }) {
  return (
    <button onClick={onClick} style={{ textAlign: "left", flex: 1 }}>
      <div
        style={{
          position: "relative",
          height: 200,
          borderRadius: 16,
          overflow: "hidden",
          background: `linear-gradient(160deg, ${COLORS[color].body} 0%, ${COLORS[color].shade} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "78%", opacity: 0.95 }}>
          <Garment type={sub} color={color === "beige" ? "black" : "beige"} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 14, bottom: 14, color: "#fff" }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{label}</div>
          <span
            style={{
              background: "#fff",
              color: "var(--ink)",
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: 0.6,
              padding: "5px 10px",
              borderRadius: 6,
            }}
          >
            SHOP NOW
          </span>
        </div>
      </div>
    </button>
  );
}

function MiniProduct({ p, onClick, wished, onWish }) {
  return (
    <div style={{ flex: "0 0 31%", minWidth: 0 }}>
      <div
        onClick={onClick}
        style={{
          position: "relative",
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: 14,
          height: 116,
          padding: 8,
          display: "grid",
          placeItems: "center",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onWish(); }}
          style={{ position: "absolute", top: 8, right: 8, color: wished ? "var(--gold)" : "#c9c9c9" }}
        >
          <Icon name="heart" size={17} fill={wished} />
        </button>
        <div style={{ width: "82%" }}>
          <Garment type={p.type} color={p.color} />
        </div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 8 }}>GHS {p.price}</div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { cartCount, wishlist, toggleWish } = useShop();
  const trending = products.filter((p) => p.tag === "trending");

  return (
    <div className="screen">
      <div className="scroll">
        <div className="pad" style={{ paddingTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="brand" style={{ fontSize: 20, display: "flex", gap: 7, alignItems: "baseline" }}>
              <span>LU<span className="par">(</span>ID</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: 12, letterSpacing: 3, fontWeight: 500, color: "#222" }}>APPAREL</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="iconbtn iconbtn--ghost"><Icon name="bell" size={21} /></button>
              <button className="iconbtn iconbtn--ghost" style={{ position: "relative" }} onClick={() => navigate("/cart")}>
                <Icon name="bag" size={21} />
                {cartCount > 0 && <span className="tab__badge" style={{ top: 2, right: 2 }}>{cartCount}</span>}
              </button>
            </div>
          </div>

          <div className="input" style={{ marginTop: 14, background: "#fff" }}>
            <span className="lead"><Icon name="search" size={18} /></span>
            <input placeholder="Search clothing, brands..." />
            <span className="trail" style={{ color: "var(--gold)" }}><Icon name="search" size={18} /></span>
          </div>

          <div className="section-head">
            <h3>Featured Collection</h3>
            <a onClick={() => navigate("/shop")}>View all</a>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <FeaturedCard label="New Arrivals" sub="tee" color="black" onClick={() => navigate("/shop")} />
            <FeaturedCard label="Essentials" sub="hoodie" color="beige" onClick={() => navigate("/shop")} />
          </div>

          <div className="section-head">
            <h3>Categories</h3>
            <a onClick={() => navigate("/shop")}>View all</a>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {categories.map((c) => (
              <button key={c.name} onClick={() => navigate("/shop")} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: `linear-gradient(160deg, ${COLORS[c.color].body}, ${COLORS[c.color].shade})`,
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto",
                  }}
                >
                  <div style={{ width: 44 }}>
                    <Garment type={c.name === "Accessories" ? "pants" : c.name === "Women" ? "hoodie" : "tee"} color={c.color === "beige" ? "black" : "beige"} />
                  </div>
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 500, marginTop: 7 }}>{c.name}</div>
              </button>
            ))}
          </div>

          <div className="section-head">
            <h3>Trending Now</h3>
            <a onClick={() => navigate("/shop")}>View all</a>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 18 }}>
            {trending.map((p) => (
              <MiniProduct
                key={p.id}
                p={p}
                wished={wishlist.includes(p.id)}
                onWish={() => toggleWish(p.id)}
                onClick={() => navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
