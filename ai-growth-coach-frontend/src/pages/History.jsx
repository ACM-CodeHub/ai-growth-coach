import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Code, Award, LoaderCircle } from "lucide-react";
import API from "../services/api";
import "../App.css";
import DashboardLayout from "../components/DashboardLayout";

function History() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !user.id) {
        navigate("/login");
        return;
      }

      try {
        const response = await API.get(`/dashboard/history/${user.id}`);
        setHistoryList(response.data || []);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate, user]);

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>📜 History & Submissions</h1>
            <p>View your previous AI reviews and progress.</p>
          </div>
        </div>

        {loading ? (
          <div className="dashboard-loading" style={{ textAlign: "center", padding: "40px" }}>
            <LoaderCircle className="spin" size={32} />
            <p>Loading your history...</p>
          </div>
        ) : historyList.length === 0 ? (
          <div className="profile-card" style={{ textAlign: "center", padding: "40px" }}>
            <h2>No History Available</h2>
            <p>Your activities will appear here once you submit code.</p>
          </div>
        ) : (
          <div className="history-list" style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
            {historyList.map((item, index) => (
              <div key={index} className="profile-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ color: "#fff", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Code size={18} /> {item.title} <span style={{ fontSize: "12px", background: "#333", padding: "2px 8px", borderRadius: "4px" }}>{item.language}</span>
                  </h3>
                  <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "10px" }}>{item.summary}</p>
                  <p style={{ color: "#888", fontSize: "12px" }}><Clock size={12} /> {item.created_at}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#4ade80", fontWeight: "bold", fontSize: "18px" }}>
                    <Award size={20} /> {item.overall_score}%
                  </div>
                  <span style={{ fontSize: "12px", color: "#888" }}>Overall Score</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default History;