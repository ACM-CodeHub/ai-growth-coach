import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { LoaderCircle, TrendingUp, AlertTriangle } from "lucide-react";
import API from "../services/api";
import "../App.css";

function GrowthReport() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!user || !user.id) {
        navigate("/login");
        return;
      }

      try {
        const response = await API.get(`/dashboard/growth-report/${user.id}`);
        setReport(response.data);
      } catch (error) {
        console.error("Failed to load growth report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [navigate, user]);

  return (
    
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>📊 Monthly Growth Report</h1>
            <p>Data-backed tracking of your coding performance and recurring patterns.</p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <LoaderCircle className="spin" size={32} />
            <p>Analyzing your performance data...</p>
          </div>
        ) : !report || report.total_submissions === 0 ? (
          <div className="profile-card" style={{ textAlign: "center", padding: "40px" }}>
            <h2>No Data Available Yet</h2>
            <p>Submit code regularly to populate your growth charts and insights.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", marginTop: "20px" }}>
            
            {/* Score Progression Line Chart */}
            <div className="profile-card">
              <h3 style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                <TrendingUp size={20} color="#4ade80" /> Coding Score Progression Over Time
              </h3>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={report.score_trend}>
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: "#1e1e2f", borderColor: "#333", color: "#fff" }} />
                    <Line type="monotone" dataKey="score" stroke="#4ade80" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recurring Mistakes Bar Chart */}
            <div className="profile-card">
              <h3 style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                <AlertTriangle size={20} color="#f87171" /> Top Recurring Mistake Categories
              </h3>
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <BarChart data={report.common_mistakes}>
                    <XAxis dataKey="category" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e1e2f", borderColor: "#333", color: "#fff" }} />
                    <Bar dataKey="count" fill="#f87171" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}
      </div>
    
  );
}

export default GrowthReport;