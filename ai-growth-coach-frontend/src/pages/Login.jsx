import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


function Login(){

const navigate = useNavigate();

const {login} = useContext(AuthContext);


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");



const handleLogin=(e)=>{

e.preventDefault();


const userData = {
    email,
    password
};


login(userData);


navigate("/");


}



return(

<div>

<h1>
Login
</h1>


<form onSubmit={handleLogin}>


<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>


<br/>


<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


<br/>


<button>
Login
</button>


</form>



<p>

Don't have account?

<button onClick={()=>navigate("/register")}>

Register

</button>

</p>


</div>

)

}


export default Login;