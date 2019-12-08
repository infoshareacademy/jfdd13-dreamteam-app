import React, { PureComponent } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip
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
const windowWidth = window.screen.width;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#d37736', '#FF8042', '#ff3c42', '#764afe'];

export default class PieChartComponent extends PureComponent {

    render() {
        return (<div >
            <PieChart
                width={windowWidth > 500 ? 500 : 300}
                height={windowWidth > 500 ? 350 : 250}
                style={{ margin: '0 auto'}}
            >
                <Pie
                    data={data}
                    labelLine={true}
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
