import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    }
];

export default class DataBarChart extends PureComponent {

    render() {
        return (<div>
            <BarChart
                width={500}
                height={300}
                data={data}
                
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/*<Bar dataKey="pv" fill="#8884d8" />*/}
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
            </div>
        );
    }
}
