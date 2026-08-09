import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";


const data = [
  {
    name:"Week 1",
    score:40
  },
  {
    name:"Week 2",
    score:60
  },
  {
    name:"Week 3",
    score:75
  }
];


function ProgressChart(){

return(

<LineChart width={400} height={250} data={data}>

<CartesianGrid />

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line 
type="monotone"
dataKey="score"
/>

</LineChart>

)

}


export default ProgressChart;