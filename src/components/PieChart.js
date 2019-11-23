import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Sector, Cell, Tooltip
} from 'recharts';

const data = [
    { name: 'Azja', value: 400 },
    { name: 'Europa', value: 300 },
    { name: 'Ameryka', value: 300 },
    { name: 'Afryka', value: 150 },
    { name: 'Ameryka Południowa', value: 200 },
    { name: 'Antarktyda', value: 200 },
    { name: 'Australia', value: 200 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
                                   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
                               }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default class PieChartComponent extends PureComponent {

    render() {
        return (<div >
            <PieChart width={500} height={350} style={{ margin: '0 auto'}}>
                <Pie
                    data={data}
                    labelLine={false}
                    // label={renderCustomizedLabel}
                    fill="#8884d8"
                    dataKey="value"
                    

                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip/>
            </PieChart>
            </div>
        );
    }
}
