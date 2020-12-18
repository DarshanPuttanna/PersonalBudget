import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { dailyExpense } from '../../actions/pbCore';
import { isAuthenticated } from '../../actions/auth';

const ExpenseChart = () => {
  const [month, setMonth] = useState([]);
  const { user, token } = isAuthenticated();
  const getDailyExpense = (userId, token) => {
    dailyExpense(userId, token)
      .then((res) => {
        'expense ', res;
        setMonth(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDailyExpense(user._id, token);
  }, []);

  let monthlyData = Array.from(Array(31)).fill(0);
  month.map((item, i) => {
    monthlyData[parseInt(item._id) - 1] = parseInt(item.total);
  });

  const data = {
    labels: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
    ],
    datasets: [
      {
        label: 'Daily Expense',
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

export default ExpenseChart;
