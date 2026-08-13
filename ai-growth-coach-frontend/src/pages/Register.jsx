import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Eye, EyeOff, LoaderCircle, Rocket, ArrowRight } from "lucide-react";
import "../App.css";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Registration failed";
      setError(errMsg);
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-blob-bg"></div>

      <div className="auth-card glass-card">
        <div className="auth-header-icon">
          <Rocket className="brand-sparkle" />
        </div>

        <h1>Join AI Growth Coach</h1>
        <h2>Create Account</h2>
        <p className="auth-subtitle">
          Start your data-backed code review and engineering growth journey
        </p>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="password-box input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="password-box input-group">
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="password-box input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="eye-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <LoaderCircle className="spin" size={20} />
            ) : (
              <>
                <span>Get Started</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-link">
          <span>Already have an account?</span>
          <div></div>
          <button onClick={() => navigate("/login")} className="text-link-btn">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;