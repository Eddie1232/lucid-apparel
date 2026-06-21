import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar, TopBar } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div className="screen screen--white">
      <StatusBar />
      <TopBar onBack={() => navigate("/login")} />
      <div className="scroll">
        <div className="pad" style={{ paddingBottom: 30 }}>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 700 }}>Create Account</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, marginBottom: 24, fontSize: 14 }}>
            Join LU(ID APPAREL today
          </p>

          <form onSubmit={(e) => { e.preventDefault(); navigate("/home"); }}>
            <div className="field">
              <label className="field__label">Full Name</label>
              <div className="input">
                <span className="lead"><Icon name="user" size={18} /></span>
                <input placeholder="Enter your full name" />
              </div>
            </div>

            <div className="field">
              <label className="field__label">Email</label>
              <div className="input">
                <span className="lead"><Icon name="mail" size={18} /></span>
                <input type="email" placeholder="youremail@example.com" />
              </div>
            </div>

            <div className="field">
              <label className="field__label">Password</label>
              <div className="input">
                <span className="lead"><Icon name="lock" size={18} /></span>
                <input type={show ? "text" : "password"} placeholder="Create a password" />
                <span className="trail" onClick={() => setShow((s) => !s)}><Icon name="eye" size={18} /></span>
              </div>
            </div>

            <div className="field">
              <label className="field__label">Confirm Password</label>
              <div className="input">
                <span className="lead"><Icon name="lock" size={18} /></span>
                <input type={show2 ? "text" : "password"} placeholder="Confirm your password" />
                <span className="trail" onClick={() => setShow2((s) => !s)}><Icon name="eye" size={18} /></span>
              </div>
            </div>

            <button type="submit" className="btn btn--dark" style={{ marginTop: 8 }}>
              <span style={{ color: "var(--gold)" }}>CREATE ACCOUNT</span>
            </button>
          </form>

          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13.5, marginTop: 24 }}>
            Already have an account? <span className="link-gold" onClick={() => navigate("/login")}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}
