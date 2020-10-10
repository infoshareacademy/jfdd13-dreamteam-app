import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { fetchTrips } from "../services/TripService";

const windowWidth = window.screen.width;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#d37736', '#FF8042', '#ff3c42', '#764afe'];

const PieChartComponent = () => {
  const [tripsData, setTripsData] = useState([]);

  useEffect(() => {
    const f = async () => {
      const result = await fetchTrips()
      const distribution = result.reduce((result, next) => {
        result[next.continent] = (result[next.continent] || 0) + 1
        return result;
      }, {})
      const trips = Object.entries(distribution).map(([name, value]) => ({ name, value }))
      setTripsData(trips)
    }
    f()
    //eslint-disable-next-line
  }, [])

  return (<div>
    <PieChart
      width={windowWidth > 500 ? 500 : 300}
      height={windowWidth > 500 ? 350 : 250}
      style={{ margin: '0 auto' }}
    >
      <Pie
        data={tripsData}
        labelLine={true}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {
          tripsData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Tooltip />
    </PieChart>
  </div>)
}

export default PieChartComponent
