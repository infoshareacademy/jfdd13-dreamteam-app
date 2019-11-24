import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Sector, Cell, Tooltip
} from 'recharts';

const data = [
    { name: 'Azja', value: 423 },
    { name: 'Europa', value: 313 },
    { name: 'Ameryka', value: 241 },
    { name: 'Afryka', value: 87 },
    { name: 'Ameryka Południowa', value: 328 },
    { name: 'Antarktyda', value: 56 },
    { name: 'Australia', value: 81 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#d37736', '#FF8042', '#ff3c42', '#764afe'];

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
                    labelLine={true}
                    // label={renderCustomizedLabel}
                    fill="#8884d8"
                    dataKey="value"
                    label
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
