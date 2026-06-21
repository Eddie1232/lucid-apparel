import { useState } from "react";
import { TopBar } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";
import Garment from "../components/Garment.jsx";
import { orders } from "../data.js";

const TABS = ["All", "Processing", "Shipped", "Delivered"];

export default function Orders() {
  const [tab, setTab] = useState("All");
  const list = tab === "All" ? orders : orders.filter((o) => o.status === tab);

  return (
    <div className="screen screen--white">
      <TopBar title="My Orders" />
      <div style={{ display: "flex", padding: "0 18px", borderBottom: "1px solid var(--line)" }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "10px 0 12px",
              fontSize: 13,
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? "var(--ink)" : "var(--text-muted)",
              borderBottom: tab === t ? "2px solid var(--gold)" : "2px solid transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="scroll">
        <div className="pad" style={{ paddingTop: 16, paddingBottom: 20 }}>
          {list.map((o) => (
            <div key={o.id} style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Order #{o.id}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>{o.date}</div>
                </div>
                <span className={`badge-pill ${o.status === "Delivered" ? "badge-pill--green" : "badge-pill--gold"}`}>
                  {o.status}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
                {o.items.map((it, i) => (
                  <div key={i} style={{ width: 54, height: 54, background: "var(--bg-soft)", borderRadius: 10, display: "grid", placeItems: "center" }}>
                    <div style={{ width: "76%" }}><Garment type={it.type} color={it.color} /></div>
                  </div>
                ))}
                {o.extra > 0 && (
                  <div style={{ width: 38, height: 54, display: "grid", placeItems: "center", color: "var(--text-muted)", fontSize: 13, fontWeight: 600 }}>
                    +{o.extra}
                  </div>
                )}
                <div style={{ flex: 1, textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Total: GHS {o.total}</span>
                  <Icon name="chevR" size={16} style={{ color: "var(--text-soft)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
