import { useState } from "react";
import API from "../services/api";

function SubmitCode() {

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("Python");
    const [code, setCode] = useState("");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);


    const analyzeCode = async () => {

        try {

            setLoading(true);


            const user = JSON.parse(localStorage.getItem("user"));


            const response = await API.post(
                "/submissions/review",
                {
                    user_id: user.id,

                    // UUID format required by backend
                    submission_id: crypto.randomUUID(),

                    code_snippet: code,

                    language: language
                }
            );


            setResult(response.data);
            localStorage.setItem(
                "ai_review",
                JSON.stringify(response.data)
            );

        } catch(error){

            console.log(error.response?.data || error);

            alert(
                error.response?.data?.detail ||
                "AI Review Failed"
            );

        }
        finally{

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

onChange={(e)=>setTitle(e.target.value)}

style={{
width:"80%",
padding:"12px",
marginBottom:"15px"
}}

/>



{/* Language Dropdown */}

<select

value={language}

onChange={(e)=>setLanguage(e.target.value)}

style={{
width:"80%",
padding:"12px",
marginBottom:"15px"
}}

>


<option value="Python">
Python
</option>


<option value="JavaScript">
JavaScript
</option>


<option value="Java">
Java
</option>


<option value="C++">
C++
</option>


<option value="C">
C
</option>


</select>



{/* Code Editor */}

<textarea

placeholder="Paste your code here..."

rows="15"

value={code}

onChange={(e)=>setCode(e.target.value)}

style={{

width:"80%",

padding:"15px",

borderRadius:"10px",

fontFamily:"monospace"

}}

/>



<br/><br/>



<button

onClick={analyzeCode}

disabled={loading}

>


{

loading ?

"Analyzing AI..." :

"Analyze Code"

}


</button>



{

result &&

(

<div className="ai-result">


<h2>
AI Feedback
</h2>


<pre>

{JSON.stringify(result,null,2)}

</pre>


</div>

)

}



</div>


)

}


export default SubmitCode;