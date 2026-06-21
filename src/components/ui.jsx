import { useNavigate, useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";
import { useShop } from "../store.jsx";

export function StatusBar({ dark = false }) {
  return (
    <div className={`statusbar ${dark ? "statusbar--dark" : ""}`}>
      <span>9:41</span>
      <span className="statusbar__icons">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </span>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.4" />
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M1 4.2a11 11 0 0 1 15 0M3.6 6.8a7 7 0 0 1 9.8 0M6.2 9.4a3 3 0 0 1 4.6 0" />
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg width="26" height="13" viewBox="0 0 26 13" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="1" y="1.5" width="21" height="10" rx="3" />
      <rect x="3" y="3.5" width="15" height="6" rx="1.5" fill="currentColor" stroke="none" />
      <rect x="23.5" y="4.5" width="2" height="4" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TopBar({ title, onBack, right, center = true }) {
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <button className="iconbtn iconbtn--ghost" onClick={onBack || (() => navigate(-1))} aria-label="Back">
        <Icon name="back" size={22} />
      </button>
      {title ? <div className="topbar__title" style={{ flex: center ? 1 : "none", textAlign: "center", marginLeft: center ? 0 : 12 }}>{title}</div> : <span style={{ flex: 1 }} />}
      <div style={{ width: 38, height: 38, display: "grid", placeItems: "center" }}>{right}</div>
    </div>
  );
}

export function Logo({ size = 30, sub = 11, light = false }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div className="brand" style={{ fontSize: size, color: light ? "#fff" : undefined }}>
        LU<span className="par">(</span>ID
      </div>
      <div className="brand__sub" style={{ fontSize: sub, color: light ? "rgba(255,255,255,.85)" : "#3a3a3a" }}>
        APPAREL
      </div>
    </div>
  );
}

const TABS = [
  { to: "/home", label: "Home", icon: "home" },
  { to: "/shop", label: "Shop", icon: "bag" },
  { to: "/cart", label: "Cart", icon: "cart" },
  { to: "/wishlist", label: "Wishlist", icon: "heart" },
  { to: "/profile", label: "Profile", icon: "user" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cartCount } = useShop();
  return (
    <nav className="tabbar">
      {TABS.map((t) => {
        const active = pathname === t.to || (t.to === "/shop" && pathname.startsWith("/product"));
        return (
          <button key={t.to} className={`tab ${active ? "active" : ""}`} onClick={() => navigate(t.to)}>
            <span style={{ position: "relative" }}>
              <Icon name={t.icon} size={22} fill={t.label === "Wishlist" && active} />
              {t.label === "Cart" && cartCount > 0 && <span className="tab__badge">{cartCount}</span>}
            </span>
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

export function Stars({ value = 5, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: "var(--gold)" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={size} fill={i <= value} stroke={1.4} />
      ))}
    </span>
  );
}
