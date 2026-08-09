import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


function Navbar(){

const {user,logout}=useContext(AuthContext);

const navigate = useNavigate();


const handleLogout=()=>{

    logout();

    navigate("/login");

}



return(

<div>

<h2>
🤖 AI Growth Coach
</h2>


{
user &&

<button onClick={handleLogout}>
Logout
</button>

}


</div>

)

}


export default Navbar;