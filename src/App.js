import './App.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis 
  LinearScale, // y axis
  PointElement
}from 'chart.js'
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

function App() {
  const data = {
    labels:['4:25', '4:26', '4:27','4:28','4:29'],
    datasets:[{
      labels: 'CPU',
      data:[0.001999600079983605, 0.001999999999999602, 0.002000400080016316, 0.001999600079983605, 0.001999999999999602, 0.0019988007195678613],
      backgroundColor:'aqua',
      borderColor:'white'
    }]
  }
  const options = {
    plugins:{
      legend:true
    }
  }
  return (
    <div className="App">
     
      <Line
        data = {data}
        options = {options} 
      ></Line>
    </div>
  );
}

export default App;
