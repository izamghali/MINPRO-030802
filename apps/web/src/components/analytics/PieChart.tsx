import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const value1 = 300
const value2 = 400
const total = value1 + value2;

const value1Per = Math.round((value1  / total * 100))
const value2Per = Math.round((value2  / total * 100))


const data01 = [
    { name: 'Group B', value: value1Per },
    { name: 'Group A', value: value2Per },
];
// const data02 = [
//   { name: 'Group A', value: 400 },
// ];

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';

    render() {
        return (
        <div className='border-2 border-green-400 h-96'>
            <div className='border-2 border-zinc-400 h-96'>
                <ResponsiveContainer>
                    <PieChart width={400} height={400}>
                        <Pie
                            className='fill-red-400'
                            dataKey="value"
                            data={data01}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            fill="#8884d8"
                            label
                        />
                    {/* <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
        
        );
    }
}
