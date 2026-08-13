import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle, Sparkles, ArrowRight } from "lucide-react";
import "../App.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      const errMsg = error.response?.data?.detail || "Invalid email or password";
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
          <Sparkles className="brand-sparkle" />
        </div>

        <h1>AI Growth Coach</h1>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">
          Log in to continue tracking your code quality and developer growth
        </p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="password-box input-group">
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password-box input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-link">
          <span>Don't have an account?</span>
          <button onClick={() => navigate("/register")} className="text-link-btn">
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;