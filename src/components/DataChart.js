import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        name: 'Lipiec', uv: 320, pv: 2400, amt: 2400,
    },
    {
        name: 'Sierpień', uv: 526, pv: 1398, amt: 2210,
    },
    {
        name: 'Wrzesień', uv: 678, pv: 9800, amt: 2290,
    },
    {
        name: 'Październik', uv: 876, pv: 3908, amt: 2000,
    }
];

export default class DataBarChart extends PureComponent {

    render() {
        return (<div>
            <BarChart
                width={500}
                height={300}
                data={data}
                style={{ margin: '0 auto'}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/*<Bar dataKey="pv" fill="#8884d8" />*/}
                <Bar dataKey="uv" fill="#82ca9d" name={'Liczba wyświetleń'} />
            </BarChart>
            </div>
        );
    }
}
