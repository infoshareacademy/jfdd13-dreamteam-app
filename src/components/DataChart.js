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
      const data = getLastYearOrTwo(usersWithProcessedDate)
      const chartData = createChartData(mock)
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
        month: { name: "October", value: 8 },
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
      a: "4444",
      date: {
        month: { name: "July", value: 6 },
        year: 2019,
      },
      email: "july@fake",
      name: "KontoZJulyowa"
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
    if (users.length < 1) return
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
  const sortedByMonthsDESC = (data) => data.sort((a, b) => a.date.value > b.date.value)

  const createChartData = (array) => {
    if (!array) return
    const latestYearData = array[0]
    if (array.length === 1) {
      const sorted = sortedByMonthsDESC(latestYearData.data)
      const latestMonthValue = sorted[0].date.month.value
      const prevMonthValue = sorted.find(userData => userData.date.month.value < latestMonthValue).date.month.value
      const lastTwoMonths = sorted.filter(userData => userData.date.month.value === latestMonthValue || userData.date.month.value === prevMonthValue)
      const data = lastTwoMonths.reduce((acc, { date }) => {
        const { name } = date.month
        if (typeof acc[name] === 'undefined') {
          acc[name] = 1
        }
        else {
          acc[name] += 1
        }
        return acc
      }, {})
      const res = Object.entries(data).map(([name, value]) => ({ name, value }))
      return res.map(({ name, value }) => (
        {
          name,
          uv: value,
          pv: value,
          amt: value,
        }
      ))
    }
    else if (typeof array !== 'undefined' && array.length > 1 ) {
      const prevYear = latestYearData.year - 1
      if (prevYear && array) {
        // console.log(array)
        const prevYearObj = array.find(userData => userData.year === prevYear)
        const lastMonth = sortedByMonthsDESC(prevYearObj.data)[0]
        const lastMonthValue = lastMonth.date.month.value
        const prevYearData = prevYearObj.data.filter(userData => userData.date.month.value === lastMonthValue)
        console.log(prevYearData)
      }
    }
    // else {
    // console.error('wrong data specified', array)
    // }
  }

  const mockData = [

    {
      name: 'Listopad',
      mobileName: '08',
      uv: 1,
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

  if (!barChartData || barChartData.length === 0) {
    return null
  }
  const dataObj = getLastYearOrTwo(barChartData)
  const chartData = createChartData(dataObj).reverse()
  console.log(createChartData(getLastYearOrTwo(mock)))
  return (<div>
    <BarChart
      width={windowWidth > 500 ? 500 : 300}
      height={windowWidth > 500 ? 300 : 150}
      data={chartData}
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
