import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Brain, Flame, BookOpen, LogOut, LoaderCircle } from "lucide-react";
import Card from "../components/Card";
import API from "../services/api";
import "../App.css";
import DashboardLayout from "../components/DashboardLayout";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    codingScore: "0%",
    totalReviews: "0 Completed",
    streak: "0 Days",
    skills: "None yet",
    recommendations: ["Submit your first code snippet to get personalized AI recommendations!"]
  });

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user || !user.id) {
        navigate("/login");
        return;
      }

      try {
        // Fetch real metrics and history from your backend API
        // Adjust endpoint URL if your backend route structure differs
        const response = await API.get(`/dashboard/stats/${user.id}`);
        
        const data = response.data;
        setDashboardData({
          codingScore: `${data.coding_score}%`,
          totalReviews: `${data.total_reviews || 0} Completed`,
          streak: `${data.streak || 0} Day(s)`,
          skills: data.skills,
          recommendations: data.recommendations
        });
      } catch (error) {
        console.error("Failed to fetch dashboard metrics, using defaults:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate, user]);

  return (
    <DashboardLayout>
      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>AI Growth Dashboard 🚀</h1>
            <p>Welcome back, {user?.name || "Developer"}</p>
          </div>

          <button onClick={logout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Profile */}
        <div className="profile-card">
          <h2>👤 Profile</h2>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="dashboard-loading">
            <LoaderCircle className="spin" size={32} />
            <p>Loading your growth stats...</p>
          </div>
        ) : (
          <div className="dashboard-cards">
            <Card
              icon={<Code />}
              title="Coding Score"
              value={dashboardData.codingScore}
            />
            <Card
              icon={<Brain />}
              title="AI Reviews"
              value={dashboardData.totalReviews}
            />
            <Card
              icon={<Flame />}
              title="Learning Streak"
              value={dashboardData.streak}
            />
            <Card
              icon={<BookOpen />}
              title="Skills"
              value={dashboardData.skills}
            />
          </div>
        )}

        {/* AI Recommendations */}
        <div className="recommendations">
          <h2>🤖 AI Recommendations</h2>
          <ul>
            {dashboardData.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;