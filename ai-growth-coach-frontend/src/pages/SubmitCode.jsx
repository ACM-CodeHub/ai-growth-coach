import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SubmitCode() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("Python");
    const [code, setCode] = useState("");

    const [loading, setLoading] = useState(false);

    const analyzeCode = async () => {

        if (!code.trim()) {
            alert("Please enter some code first.");
            return;
        }

        try {

            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));

            const response = await API.post(
    "/submissions/review",
    {
        user_id: user.id,
        title: title.trim() || "Untitled Code",
        code_snippet: code,
        language: language
    }
);

            // Save the AI review
            localStorage.setItem(
    "ai_review",
    JSON.stringify({
        ...response.data,
        submission: {
            title: title || "Untitled Submission",
            language: language,
            code: code
        }
    })
);

            // Go to AI Review page
            navigate("/ai-review");

        } catch (error) {

            console.log(error.response?.data || error);

            alert(
                error.response?.data?.detail ||
                "AI Review Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="dashboard">

            <h1>
                💻 Submit Code
            </h1>

            <p>
                Submit your code and get AI-powered feedback.
            </p>

            {/* Title */}

            <input
                type="text"
                placeholder="Code Title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    width: "80%",
                    padding: "12px",
                    marginBottom: "15px"
                }}
            />

            {/* Language */}

            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                    width: "80%",
                    padding: "12px",
                    marginBottom: "15px"
                }}
            >

                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="C">C</option>

            </select>

            {/* Code */}

            <textarea
                placeholder="Paste your code here..."
                rows="15"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                    width: "80%",
                    padding: "15px",
                    borderRadius: "10px",
                    fontFamily: "monospace"
                }}
            />

            <br />
            <br />

            <button
                onClick={analyzeCode}
                disabled={loading}
            >

                {loading
                    ? "Analyzing AI..."
                    : "Analyze Code"
                }

            </button>

        </div>

    );
}

export default SubmitCode;