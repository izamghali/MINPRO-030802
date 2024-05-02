'use client'
import React from "react"
import { AreaChart, Area, BarChart, Bar, 
    ResponsiveContainer, CartesianGrid, YAxis, XAxis, Tooltip, Legend
} from 'recharts';

export default function Chart() {

    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

    const testData = [
        {
            name: 'Jun',
            pro1: 2000,
            pro2: 3000
        },
        {
            name: 'Feb',
            pro1: 2500,
            pro2: 1800
        },
        {
            name: 'Mar',
            pro1: 9999,
            pro2: 7777
        },
        {
            name: 'Apr',
            pro1: 666,
            pro2: 7129
        },
        {
            name: 'May',
            pro1: 1,
            pro2: 9999
        },
    ]

        return (
            <div>
                <BarChart width={500} height={400} data={testData}>
                    <YAxis />
                    <XAxis dataKey="name" />
                    <CartesianGrid 
                        strokeDasharray="5 5"
                    />

                    <Tooltip />
                    <Legend />

                    <Bar 
                        type="monotone" 
                        dataKey="pro1" 
                        stroke="#e74c3c"   
                        fill="e74c3c"
                    />
                    <Bar 
                        type="monotone" 
                        dataKey="pro2" 
                        stroke="#3498db"   
                        fill="#3498db"   
                    />
                </BarChart>

            </div>
            // <ResponsiveContainer width={700} height="100%">
            // </ResponsiveContainer>
    )
};

