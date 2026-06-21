import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";

const MENU = [
  { label: "My Orders", icon: "bag", to: "/orders" },
  { label: "Wishlist", icon: "heart", to: "/wishlist" },
  { label: "Addresses", icon: "pin", to: "/settings" },
  { label: "Payment Methods", icon: "card", to: "/settings" },
  { label: "Settings", icon: "gear", to: "/settings" },
  { label: "Help & Support", icon: "help", to: "/settings" },
];

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="screen screen--white">
      <TopBar title="My Profile" right={<button className="iconbtn iconbtn--ghost" onClick={() => navigate("/settings")}><Icon name="gear" size={20} /></button>} />
      <div className="scroll">
        <div className="pad" style={{ paddingBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0 20px" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--gold)", color: "var(--ink)", display: "grid", placeItems: "center", fontFamily: "var(--serif)", fontWeight: 700, fontSize: 24 }}>
              E
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 17 }}>Edward</div>
              <div style={{ color: "var(--text-muted)", fontSize: 13 }}>user@email.com</div>
            </div>
          </div>

          <div>
            {MENU.map((m) => (
              <button key={m.label} onClick={() => navigate(m.to)} style={rowStyle}>
                <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Icon name={m.icon} size={20} style={{ color: "var(--ink)" }} />
                  <span style={{ fontSize: 14.5 }}>{m.label}</span>
                </span>
                <Icon name="chevR" size={17} style={{ color: "var(--text-soft)" }} />
              </button>
            ))}

            <button onClick={() => navigate("/login")} style={{ ...rowStyle, color: "var(--red)", borderBottom: "none" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Icon name="logout" size={20} />
                <span style={{ fontSize: 14.5, fontWeight: 500 }}>Logout</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const rowStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 2px",
  borderBottom: "1px solid var(--line)",
};
