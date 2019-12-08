import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const data = [
    {
        name: 'Lipiec',
        mobileName: '07',
        uv: 320,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Sierpień',
        mobileName: '08',
        uv: 526,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Wrzesień',
        mobileName: '09',
        uv: 678,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Październik',
        mobileName: '10',
        uv: 876,
        pv: 3908,
        amt: 2000,
    }
];
const windowWidth = window.screen.width;
export default class DataBarChart extends PureComponent {

    render() {
        return (<div>
            <BarChart
                width={windowWidth > 500 ? 500 : 300}
                height={windowWidth > 500 ? 300: 150}
                data={data}
                style={{ margin: '0 auto'}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={windowWidth > 500 ? "name" : "mobileName"} />
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
