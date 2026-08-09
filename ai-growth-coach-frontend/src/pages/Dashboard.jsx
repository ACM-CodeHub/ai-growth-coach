import Card from "../components/Card";


function Dashboard(){


return(

<div>


<h1>
AI Growth Dashboard 🚀
</h1>


<p>
Track your coding progress with AI insights.
</p>



<div className="dashboard-cards">


<Card

icon="💻"

title="Coding Score"

value="75%"

/>


<Card

icon="🤖"

title="AI Reviews"

value="12 Completed"

/>


<Card

icon="🔥"

title="Learning Streak"

value="5 Days"

/>


<Card

icon="📚"

title="Skills"

value="Python, React"

/>


</div>



<h2>
AI Recommendations
</h2>


<ul>

<li>
Practice Data Structures daily
</li>

<li>
Improve React component design
</li>

<li>
Solve 2 coding problems every day
</li>


</ul>


</div>

)

}


export default Dashboard;