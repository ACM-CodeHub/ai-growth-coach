import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import API from "../services/api";

function AIReview() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAIReview = async () => {
            if (!user || !user.id) {
                navigate("/login");
                return;
            }

            try {
                // Backend se sirf is specific logged-in user ka latest review fetch karein
                const response = await API.get(`/dashboard/ai-review/${user.id}`);
                setReview(response.data);
            } catch (error) {
                console.error("Failed to fetch AI review:", error);
                setReview(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAIReview();
    }, [navigate, user]);

    if (loading) {
        return (
            <div className="dashboard" style={{ textAlign: "center", padding: "50px" }}>
                <LoaderCircle className="spin" size={32} />
                <p style={{ marginTop: "10px", color: "#aaa" }}>Loading AI review...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <h1>
                🤖 AI Code Review
            </h1>

            {!review ? (
                <div className="profile-card" style={{ textAlign: "center", padding: "40px", marginTop: "20px" }}>
                    <h2>
                        No Reviews Yet
                    </h2>
                    <p style={{ color: "#aaa", marginTop: "10px" }}>
                        Submit your first code to get AI feedback.
                    </p>
                </div>
            ) : (
                <div>
                    {/* ================= SUBMISSION ================= */}
                    <div className="profile-card" style={{ marginTop: "20px" }}>
                        <h2>
                            📝 Submitted Code
                        </h2>
                        <p>
                            <b>Title:</b>{" "}
                            {review.title || "Untitled Submission"}
                        </p>
                        <p>
                            <b>Language:</b>{" "}
                            {review.language || "Unknown"}
                        </p>

                        {/* CODE */}
                        <h3>
                            Code
                        </h3>
                        <pre
                            style={{
                                background: "#020617",
                                padding: "20px",
                                borderRadius: "10px",
                                overflowX: "auto",
                                color: "#e2e8f0",
                                fontFamily: "monospace",
                                fontSize: "15px",
                                lineHeight: "1.6",
                                textAlign: "left"
                            }}
                        >
                            <code>{review.code}</code>
                        </pre>
                    </div>

                    {/* ================= SCORE ================= */}
                    <div className="profile-card" style={{ marginTop: "20px", textAlign: "center" }}>
                        <h2>
                            Overall Score
                        </h2>
                        <h1 style={{ color: "#4ade80", fontSize: "40px", marginTop: "10px" }}>
                            {review.overall_score || 0}/100
                        </h1>
                    </div>

                    {/* ================= SUMMARY ================= */}
                    <div className="profile-card" style={{ marginTop: "20px" }}>
                        <h2>
                            Summary
                        </h2>
                        <p style={{ color: "#d1d5db", lineHeight: "1.6", marginTop: "10px" }}>
                            {review.summary || "No summary available."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AIReview;