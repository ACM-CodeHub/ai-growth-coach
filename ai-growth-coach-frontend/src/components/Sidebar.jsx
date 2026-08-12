import { Link } from "react-router-dom";


function Sidebar(){

return(

<div className="sidebar">

<h3>Menu</h3>

<ul>

<li>
<Link to="/dashboard">Dashboard</Link>
</li>


<li>
<Link to="/submit-code">
Submit Code
</Link>
</li>


<li>
<Link to="/ai-review">
AI Review
</Link>
</li>


<li>
<Link to="/history">
History
</Link>
</li>


<li>
<Link to="/growth-report">
Growth Report
</Link>
</li>


</ul>


</div>

)

}


export default Sidebar;