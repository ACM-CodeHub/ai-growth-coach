import { useNavigate } from "react-router-dom";
import { Code, Brain, Flame, BookOpen, LogOut } from "lucide-react";
import Card from "../components/Card";
import "../App.css";
import DashboardLayout from "../components/DashboardLayout";

function Dashboard(){
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));
const logout = ()=>{

localStorage.removeItem("user");
navigate("/login");

};

return(
    <DashboardLayout>
<div className="dashboard">
{/* Header */}

<div className="dashboard-header">

<div>
<h1>
AI Growth Dashboard 🚀
</h1>

<p>
Welcome back, {user?.name}
</p>
</div>

<button onClick={logout}>
<LogOut size={18}/>
Logout
</button>

</div>
{/* Profile */}

<div className="profile-card">
<h2>
👤 Profile
</h2>

<p>
Name: {user?.name}
</p>

<p>
Email: {user?.email}
</p>

</div>
{/* Stats */}

<div className="dashboard-cards">

<Card
icon={<Code/>}
title="Coding Score"
value="75%"
/>

<Card
icon={<Brain/>}
title="AI Reviews"
value="12 Completed"
/>

<Card
icon={<Flame/>}
title="Learning Streak"
value="5 Days"
/>

<Card
icon={<BookOpen/>}
title="Skills"
value="Python, React"
/>

</div>
{/* AI Recommendations */}

<div className="recommendations">

<h2>
🤖 AI Recommendations
</h2>

<ul>

<li>
Practice Data Structures daily
</li>

<li>
Build more React projects
</li>

<li>
Improve problem solving skills
</li>

<li>
Complete one AI challenge every week
</li>

</ul>

</div>

</div>

</DashboardLayout>
)

}

export default Dashboard;