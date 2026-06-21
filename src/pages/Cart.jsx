import { TopBar } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";
import Garment from "../components/Garment.jsx";
import { colorLabel } from "../data.js";
import { useShop } from "../store.jsx";

export default function Cart() {
  const { cart, productById, changeQty, removeFromCart } = useShop();
  const items = cart.map((c) => ({ ...c, p: productById(c.id) })).filter((c) => c.p);
  const subtotal = items.reduce((n, x) => n + x.p.price * x.qty, 0);
  const shipping = items.length ? 20 : 0;
  const total = subtotal + shipping;

  return (
    <div className="screen screen--white">
      <TopBar title="My Cart" />
      <div className="scroll">
        <div className="pad" style={{ paddingBottom: 20 }}>
          {items.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: 60 }}>Your cart is empty.</p>
          )}
          {items.map((it, idx) => (
            <div key={idx} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
              <div style={{ width: 64, height: 70, background: "var(--bg-soft)", borderRadius: 12, display: "grid", placeItems: "center" }}>
                <div style={{ width: "78%" }}><Garment type={it.p.type} color={it.color} /></div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{it.p.name}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 12, margin: "3px 0 6px" }}>
                  {colorLabel[it.color]} · Size {it.size}
                </div>
                <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: 14 }}>GHS {it.p.price}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button className="qtybtn" onClick={() => changeQty(idx, -1)}><Icon name="minus" size={14} /></button>
                  <span style={{ fontSize: 14, fontWeight: 600, minWidth: 12, textAlign: "center" }}>{it.qty}</span>
                  <button className="qtybtn" onClick={() => changeQty(idx, 1)}><Icon name="plus" size={14} /></button>
                  <button style={{ color: "#c9c9c9", marginLeft: 4 }} onClick={() => removeFromCart(idx)}><Icon name="trash" size={17} /></button>
                </div>
              </div>
            </div>
          ))}

          <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0", borderBottom: "1px solid var(--line)", width: "100%", color: "var(--text-muted)", fontSize: 13.5 }}>
            <Icon name="tag" size={18} /> Add a promo code
          </button>

          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
            <Row label="Subtotal" value={`GHS ${subtotal}`} />
            <Row label="Shipping" value={`GHS ${shipping}`} />
            <div style={{ height: 1, background: "var(--line)" }} />
            <Row label="Total" value={`GHS ${total}`} big />
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 18px", borderTop: "1px solid var(--line)", background: "#fff" }}>
        <button className="btn btn--gold">
          <Icon name="lock" size={18} /> CHECKOUT
        </button>
      </div>

      <style>{`.qtybtn{width:26px;height:26px;border:1px solid var(--line-2);border-radius:7px;display:grid;place-items:center;color:var(--ink)}`}</style>
    </div>
  );
}

function Row({ label, value, big }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: big ? "var(--ink)" : "var(--text-muted)", fontSize: big ? 16 : 13.5, fontWeight: big ? 700 : 400 }}>{label}</span>
      <span style={{ color: big ? "var(--gold)" : "var(--ink)", fontWeight: big ? 700 : 600, fontSize: big ? 17 : 13.5 }}>{value}</span>
    </div>
  );
}
