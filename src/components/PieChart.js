import React, {PureComponent} from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip
} from 'recharts';
import {fetchTrips} from "../services/TripService";

const data = [
    {name: 'Azja', value: 423},
    {name: 'Europa', value: 313},
    {name: 'Ameryka', value: 241},
    {name: 'Afryka', value: 87},
    {name: 'Ameryka Południowa', value: 328},
    {name: 'Antarktyda', value: 56},
    {name: 'Australia', value: 81}
];
const windowWidth = window.screen.width;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#d37736', '#FF8042', '#ff3c42', '#764afe'];

export default class PieChartComponent extends PureComponent {

    state = {
        tripsData: []
    };

    componentDidMount() {
        fetchTrips().then(res => this.setState({
            tripsData: res
        }));
        console.log(this.state.tripsData);
    }
    calculateContinents(arr, currentContinent) {

        const logicOutput = arr.filter(item => arr[0].hasOwnProperty('continent') ? item.continent === currentContinent: '');

        return logicOutput
    }

    calculateChartOutput() {

        const stateData = this.state.tripsData;
        const continentsNames = data.map(el => el.name);
        const continentsValues = []
        console.log(stateData)
        if (stateData.isArray) {
           console.log('data os an arr')
            continentsNames.forEach(name => {
                const calc = this.calculateContinents(stateData, name)
                continentsValues.push(calc)
            })


       } return false
    }


    render() {
        return (<div>
                {console.log(this.state)}
                {   this.calculateChartOutput()}
                <PieChart
                    width={windowWidth > 500 ? 500 : 300}
                    height={windowWidth > 500 ? 350 : 250}
                    style={{margin: '0 auto'}}
                >
                    <Pie
                        data={data}
                        labelLine={true}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </div>
        );
    }
}
