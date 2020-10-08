import React, { useState, useEffect } from 'react';
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

const DataBarChart = () => {
  const [barChartData, setBarchartData] = useState([])
  useEffect(() => {
    const f = async () => {
      const result = await fetchUsers()
      const usersWithDate = result.filter(user => user.date)
      const usersWithProcessedDate = setUsersDateObject(usersWithDate)
      setBarchartData(usersWithProcessedDate)
    }
    f()
    // eslint-disable-next-line
  }, [])

  const getMonthName = (num) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[num]
  }


  const mock = [
    {
      a: "4qeUoEWmtyVSJfvwf7KKj4K6qB43",
      date: {
        month: { name: "October", value: 9 },
        year: 2020,
      },
      email: "super@super.super",
      name: "KontoZPazdziernika"
    },
    {
      a: "33333",
      date: {
        month: { name: "September", value: 8 },
        year: 2020,
      },
      email: "fake@fake",
      name: "KontoZWrzesnia"
    },
    {
      a: "32323232323",
      date: {
        month: { name: "September", value: 8 },
        year: 2020,
      },
      email: "fake@fake",
      name: "KontoZWrzesnia2"
    },
    {
      a: "2222222",
      date: {
        month: { name: "August", value: 7 },
        year: 2019,
      },
      email: "August@fake",
      name: "KontoZAugustowa"
    },
    {
      a: "33333",
      date: {
        month: { name: "August", value: 7 },
        year: 2019,
      },
      email: "August@fake",
      name: "KontoZAugustowa"
    },
    {
      a: "33333",
      date: {
        month: { name: "August", value: 7 },
        year: 2018,
      },
      email: "2018@fake",
      name: "20182018"
    },

  ]

  const setUsersDateObject = (user) => (user.reduce((acc, current) => {
    const dateFromTimestamp = new Date(current.date)
    const value = dateFromTimestamp.getMonth()
    return [
      ...acc, {
        ...current,
        date: {
          month: {
            name: getMonthName(dateFromTimestamp.getMonth()),
            value,
          },
          year: dateFromTimestamp.getFullYear()
        }
      }
    ]
  }, []))
  const getLastYearOrTwo = (users) => {
    const lastRegisterYear = users.sort((a, b) => a.date.year > b.date.year)[0].date.year
    const lastYear = users.filter(user => user.date.year === lastRegisterYear)
    const hasUniqueMonths = lastYear.find(user => user.date.month.value !== lastYear[0].date.month.value)
    if (hasUniqueMonths) {
      return [
        {
          year: lastRegisterYear,
          data: lastYear
        }
      ]
    }

    return [
      {
        year: lastRegisterYear,
        data: lastYear
      },
      {
        year: lastRegisterYear - 1,
        data: users.filter(user => user.date.year === lastRegisterYear - 1)
      },
    ]
  }
  const sortedByMonths = (data) => data.sort((a, b) => a.date.value > b.date.value)

  const createChartData = (array)=> {
    if(array.length === 1) {
      const latestMonthValue = sortedByMonths(array[0].data)[0].date.month.value
      // find previous month 
      // prepare them as chart data
      
    }
  }


  const mockData = [

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
      uv: barChartData.length,
      pv: 3908,
      amt: 2000,
    }
  ]
  // if (!barChartData) return null
  // console.log(getLastYearOrTwo(mock))
  const dataObj = getLastYearOrTwo(mock)
  console.log(dataObj)
  createChartData(dataObj)


  return (<div>
    <BarChart
      width={windowWidth > 500 ? 500 : 300}
      height={windowWidth > 500 ? 300 : 150}
      data={mockData}
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

export default DataBarChart
