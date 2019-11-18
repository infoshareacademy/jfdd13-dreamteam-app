import React from 'react';
import PieChart from "./PieChart";

function Dashboard () {
    const chartStyles = {
        height: '200px'
    };
  return (

    <div className="Dashboard">
        <PieChart/>
    </div>
  );
}

export default Dashboard;