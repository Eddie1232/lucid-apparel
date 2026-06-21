import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar, Logo } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className="screen screen--white">
      <StatusBar />
      <div className="scroll">
        <div className="pad" style={{ paddingTop: 28, paddingBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
            <Logo size={34} sub={11} />
          </div>

          <h1 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 700 }}>Welcome Back</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, marginBottom: 26, fontSize: 14 }}>
            Sign in to continue
          </p>

          <form onSubmit={(e) => { e.preventDefault(); navigate("/home"); }}>
            <div className="field">
              <label className="field__label">Email Address</label>
              <div className="input">
                <span className="lead"><Icon name="mail" size={18} /></span>
                <input type="email" placeholder="youremail@example.com" defaultValue="edward@email.com" />
              </div>
            </div>

            <div className="field">
              <label className="field__label">Password</label>
              <div className="input">
                <span className="lead"><Icon name="lock" size={18} /></span>
                <input type={show ? "text" : "password"} placeholder="Enter your password" defaultValue="password" />
                <span className="trail" onClick={() => setShow((s) => !s)}>
                  <Icon name="eye" size={18} />
                </span>
              </div>
            </div>

            <div style={{ textAlign: "right", marginBottom: 22 }}>
              <span className="link-gold" style={{ fontSize: 12.5 }}>Forgot Password?</span>
            </div>

            <button type="submit" className="btn btn--dark">SIGN IN</button>
          </form>

          <div className="divider-or">OR</div>

          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13.5, marginBottom: 16 }}>
            Don't have an account?
          </p>
          <button className="btn btn--outline" onClick={() => navigate("/register")}>
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
}
