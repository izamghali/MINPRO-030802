import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register( ArcElement, Tooltip, Legend )

export default function DonutChart({ className }: { className: string }) {

    const data = {
        labels: ['MALE', 'FEMALE'],
        datasets: [{
            label: 'poll',
            data: [3, 6],
            backgroundColor: ['rgb(147 197 253)', 'rgb(249 168 212)'],
            // backgroundColor: ['rgb(74, 222, 128)', 'black'],
        }]
    }

    const options = {

    }

    return (
        <div className={`max-w-full sm:max-w-96 flex justify-center bg-white rounded-md p-4 ${ className } `}>
            <Doughnut data={data} options={options} ></Doughnut>
        </div>
    )
};

