import React, {useState, useEffect} from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = ()  => {

    const [chart, setChart] = useState([])

    const baseUrl = ""

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${baseUrl}`,{
                method : 'POST'
            }).then((response) => {
                response.json().then((json) => {
                    setChart(json.data)
                })
            }).catch(e =>{
                console.log(e);
            })
        }
           
    }, [baseUrl])

    const data = {
        labels: chart?.data?.map(x => x.time),
        datasets: [{
            label: 'CPU USAGE FOR EXAMPLE',
            data: chart?.data?.map(x => x.value),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

    const options = {
        maintainAspectRatio : false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels:{
                fontSize :26
            }
        }
    }


    return (
        <div>
            <Bar
                data = {data}
                height = {400}
                options = {options}
            />
        </div>
    )
}
export default BarChart