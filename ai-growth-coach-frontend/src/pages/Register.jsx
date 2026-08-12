import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

function Register(){

const navigate = useNavigate();
const [showPassword,setShowPassword]=useState(false);
const [loading,setLoading]=useState(false);
const [error,setError]=useState("");

const [formData,setFormData] = useState({
name:"",
email:"",
password:""
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleRegister = async(e)=>{

e.preventDefault();

setLoading(true);
setError("");

try{

    setLoading(true);

await API.post(
"/auth/register",
formData
);

navigate("/login");

}

catch(error){

alert(
error.response?.data?.detail ||
"Registration failed"
);

}
finally{

setLoading(false);

}

};

return(

<div className="auth-container">
<div className="auth-card">

<h1>
🚀 Create Account
</h1>

<p className="auth-subtitle">
Start your AI growth journey
</p>

<form onSubmit={handleRegister}>

<input
type="text"
name="name"
placeholder="Full Name"
value={formData.name}
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
required
/>

<div className="password-box">

<input
type={showPassword ? "text":"password"}
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
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

"Register"

}

</button>

</form>

<p className="auth-link">

Already have an account?

<button
onClick={()=>navigate("/login")}
>

Login

</button>

</p>

</div>

</div>

)

}

export default Register;