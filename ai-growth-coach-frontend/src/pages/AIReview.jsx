import {useEffect, useState} from "react";

function AIReview(){

const [review,setReview] = useState(null);


useEffect(()=>{

const data = localStorage.getItem("ai_review");

if(data){
    setReview(JSON.parse(data));
}

},[]);



return(

<div className="dashboard">


<h1>
🤖 AI Code Review
</h1>


{
!review ?

<div className="profile-card">

<h2>
No Reviews Yet
</h2>

<p>
Submit your first code to get AI feedback.
</p>

</div>


:


<div>


<div className="profile-card">

<h2>
Overall Score
</h2>

<h1>
{review.review.overall_score}/100
</h1>


</div>



<div className="profile-card">

<h2>
Summary
</h2>

<p>
{review.review.summary}
</p>


</div>




<h2>
Issues Found
</h2>



{
review.issues.map((issue)=>(


<div 
className="profile-card"
key={issue.id}
>


<h3>
⚠️ {issue.title}
</h3>


<p>
<b>Category:</b> {issue.category}
</p>


<p>
<b>Severity:</b> {issue.severity}
</p>


<p>
{issue.description}
</p>


<p>
<b>Suggestion:</b>
<br/>
{issue.suggestion}
</p>



</div>


))
}



</div>

}



</div>

)

}


export default AIReview;