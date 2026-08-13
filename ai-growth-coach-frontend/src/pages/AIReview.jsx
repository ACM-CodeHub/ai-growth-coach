import { useState } from "react";

function AIReview() {

    const [review] = useState(() => {

        const data = localStorage.getItem("ai_review");

        if (data) {
            return JSON.parse(data);
        }

        return null;
    });


    return (

        <div className="dashboard">

            <h1>
                🤖 AI Code Review
            </h1>


            {!review ? (

                <div className="profile-card">

                    <h2>
                        No Reviews Yet
                    </h2>

                    <p>
                        Submit your first code to get AI feedback.
                    </p>

                </div>

            ) : (

                <div>


                    {/* ================= SUBMISSION ================= */}

                    <div className="profile-card">

                        <h2>
                            📝 Submitted Code
                        </h2>

                        <p>
                            <b>Title:</b>{" "}
                            {review.submission?.title || "Untitled Submission"}
                        </p>

                        <p>
                            <b>Language:</b>{" "}
                            {review.submission?.language || "Unknown"}
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
                            {review.submission?.code}
                        </pre>

                    </div>


                    {/* ================= SCORE ================= */}

                    <div className="profile-card">

                        <h2>
                            Overall Score
                        </h2>

                        <h1>
                            {review.review.overall_score}/100
                        </h1>

                    </div>


                    {/* ================= SUMMARY ================= */}

                    <div className="profile-card">

                        <h2>
                            Summary
                        </h2>

                        <p>
                            {review.review.summary}
                        </p>

                    </div>


                    {/* ================= ISSUES ================= */}

                    <h2>
                        Issues Found
                    </h2>


                    {review.issues.length === 0 ? (

                        <div className="profile-card">

                            <h2>
                                🎉 No Issues Found
                            </h2>

                            <p>
                                Great job! Your code has no
                                significant issues according to the AI review.
                            </p>

                        </div>

                    ) : (

                        review.issues.map((issue) => (

                            <div
                                className="profile-card"
                                key={issue.id}
                            >

                                <h3>
                                    ⚠️ {issue.title}
                                </h3>

                                <p>
                                    <b>Category:</b>{" "}
                                    {issue.category}
                                </p>

                                <p>
                                    <b>Severity:</b>{" "}
                                    {issue.severity}
                                </p>

                                <p>
                                    {issue.description}
                                </p>

                                <p>
                                    <b>Suggestion:</b>
                                    <br />
                                    {issue.suggestion}
                                </p>

                            </div>

                        ))

                    )}

                </div>

            )}

        </div>

    );
}

export default AIReview;