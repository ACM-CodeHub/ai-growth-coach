import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import "../App.css";

function Login(){

const navigate = useNavigate();
const [showPassword,setShowPassword] = useState(false);
const [loading,setLoading] = useState(false);
const [error,setError] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async(e)=>{

e.preventDefault();

setLoading(true);
setError("");

try{
setLoading(true);

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
finally{
setLoading(false);
}

};

return(

<div className="auth-container">

<div className="auth-card">

<h1>
🤖 AI Growth Coach
</h1>

<h2>
Welcome Back
</h2>

<p className="auth-subtitle">
Login to continue your growth journey
</p>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<div className="password-box">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
>

{
showPassword ?

<Eye/>

:

<EyeOff/>

}

</button>

</div>

<button type="submit" disabled={loading}>

{
loading ?

<LoaderCircle className="spin"/>

:

"Login"

}

</button>

</form>

<p className="auth-link">

Don't have an account?

<button 
onClick={()=>navigate("/register")}
>

Register

</button>

{
error &&

<p className="error-message">
{error}
</p>

}

</p>

</div>

</div>

)


}


export default Login;