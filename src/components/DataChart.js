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
import { fetchUsers } from "../services/TripService";

const windowWidth = window.screen.width;
export default class DataBarChart extends PureComponent {
  state = {
    barChartData: []
  }

  componentDidMount() {
    const usersData = fetchUsers();
    usersData.then(res => this.setState({
      barChartData: res
    }))
  }


  get data() {

    return [

      {
        name: 'Listopad',
        mobileName: '08',
        uv: 2,
        pv: 2,
        amt: 2,
      },
      {
        name: 'Grudzień',
        mobileName: '10',
        uv: this.state.barChartData.length,
        pv: 3908,
        amt: 2000,
      }
    ]

  }

  render() {
    return (<div>
      <BarChart
        width={windowWidth > 500 ? 500 : 300}
        height={windowWidth > 500 ? 300 : 150}
        data={this.data}
        style={{ margin: '0 auto' }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={windowWidth > 500 ? "name" : "mobileName"} />
        <YAxis />
        <Tooltip />
        <Legend />
        {/*<Bar dataKey="pv" fill="#8884d8" />*/}
        <Bar dataKey="uv" fill="#82ca9d" name={'Liczba zarejestrowanych użytkowników'} />
      </BarChart>
    </div>
    );
  }
}
