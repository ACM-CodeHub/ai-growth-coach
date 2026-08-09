import {useState} from "react";
import {useNavigate} from "react-router-dom";


function Register(){

const navigate = useNavigate();


const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");



const handleRegister=(e)=>{

e.preventDefault();


console.log({
name,
email,
password
});


navigate("/login");


}



return(

<div>


<h1>
Create Account
</h1>


<form onSubmit={handleRegister}>


<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>


<br/>


<input
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
Register
</button>


</form>


</div>

)

}


export default Register;