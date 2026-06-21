import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar, Logo } from "../components/ui.jsx";

export default function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate("/login"), 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div
      className="screen screen--ink"
      style={{
        position: "relative",
        backgroundImage:
          "radial-gradient(120% 80% at 70% 20%, #2a2a2a 0%, #161616 45%, #000 100%)",
      }}
      onClick={() => navigate("/login")}
    >
      <StatusBar dark />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0) 22px, rgba(0,0,0,0.25) 60px)",
          mixBlendMode: "screen",
        }}
      />
      <div style={{ flex: 1, display: "grid", placeItems: "center", position: "relative" }}>
        <div style={{ textAlign: "center" }} className="fade-in">
          <Logo size={56} sub={15} light />
          <div
            style={{
              marginTop: 30,
              color: "#fff",
              fontSize: 16,
              fontWeight: 300,
              letterSpacing: 0.4,
            }}
          >
            Wear Confidence.
          </div>
        </div>
      </div>
      <div style={{ position: "relative", padding: "0 40px 46px", textAlign: "center" }}>
        <div
          style={{
            height: 3,
            borderRadius: 4,
            background: "rgba(255,255,255,0.14)",
            overflow: "hidden",
          }}
        >
          <div className="splash-bar" />
        </div>
        <div
          style={{
            marginTop: 16,
            color: "rgba(255,255,255,0.7)",
            fontSize: 11,
            letterSpacing: 3,
            fontWeight: 500,
          }}
        >
          LOADING...
        </div>
      </div>
      <style>{`
        .splash-bar{height:100%;width:0;background:var(--gold);border-radius:4px;animation:load 2.4s ease forwards}
        @keyframes load{to{width:100%}}
      `}</style>
    </div>
  );
}
