import {useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

function Login(){
const navigate = useNavigate();
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const handleLogin = async(e)=>{

e.preventDefault();

try{
const response = await API.post(
"/auth/login",
{
email,
password
}
);

localStorage.setItem(
"user",
JSON.stringify(response.data.user)
);

navigate("/dashboard");
}
catch(error){

console.log(error.response.data);
alert(error.response.data.detail);

}

};

return(

<div>

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button type="submit">
Login
</button>

</form>

<button onClick={()=>navigate("/register")}>
Register
</button>

</div>

)

}

export default Login;