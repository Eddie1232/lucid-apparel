import { TopBar } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";

const ROWS = [
  { label: "Addresses", icon: "pin" },
  { label: "Payment Methods", icon: "card" },
  { label: "Notifications", icon: "bell" },
  { label: "Language", icon: "globe", value: "English" },
  { label: "About Us", icon: "info" },
  { label: "Terms & Conditions", icon: "doc" },
  { label: "Privacy Policy", icon: "shield" },
];

export default function Settings() {
  return (
    <div className="screen screen--white">
      <TopBar title="Settings" />
      <div className="scroll">
        <div className="pad" style={{ paddingBottom: 20 }}>
          {ROWS.map((r) => (
            <button key={r.label} style={rowStyle}>
              <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Icon name={r.icon} size={20} style={{ color: "var(--ink)" }} />
                <span style={{ fontSize: 14.5 }}>{r.label}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {r.value && <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{r.value}</span>}
                <Icon name="chevR" size={17} style={{ color: "var(--text-soft)" }} />
              </span>
            </button>
          ))}
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
  padding: "17px 2px",
  borderBottom: "1px solid var(--line)",
};
