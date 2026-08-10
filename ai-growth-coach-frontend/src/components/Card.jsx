function Card({icon,title,value}){
return(
<div className="card">
<div className="card-icon">
{icon}
</div>
<h3>
{title}
</h3>
<p>
{value}
</p>
</div>
)
}

export default Card;