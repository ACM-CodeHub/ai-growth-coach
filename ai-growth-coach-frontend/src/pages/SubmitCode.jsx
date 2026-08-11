function SubmitCode(){

return(

<div className="dashboard">

<h1>
💻 Submit Code
</h1>

<p>
Submit your code and get AI-powered feedback.
</p>

<textarea
placeholder="Paste your code here..."
rows="10"
style={{
width:"80%",
padding:"15px",
borderRadius:"10px"
}}
/>


<br/><br/>

<button>
Analyze Code
</button>


</div>

)

}

export default SubmitCode;