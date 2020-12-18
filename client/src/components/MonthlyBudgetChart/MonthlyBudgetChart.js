import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { monthlyBudget } from '../../actions/pbCore';
import { isAuthenticated } from '../../actions/auth';

const MonthlyBudgetChart = () => {
  const [month, setMonth] = useState([]);
  const { user, token } = isAuthenticated();
  const getMonthlyBudget = (userId, token) => {
    monthlyBudget(userId, token)
      .then((res) => {
        console.log('month res ', res);
        setMonth(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMonthlyBudget(user._id, token);
  }, []);

  let monthlyData = Array.from(Array(12)).fill(0);
  month.map((item, i) => {
    monthlyData[parseInt(item._id) - 1] = parseInt(item.total);
  });

  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Monthly Budget',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: monthlyData,
      },
    ],
  };

  return (
    <Line
      data={data}
      width={400}
      height={400}
      options={{
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default MonthlyBudgetChart;
