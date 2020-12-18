import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { getChartExpenses } from '../../actions/pbCore';
import { isAuthenticated } from '../../actions/auth';

const ExpenseChart = () => {
  const { user, token } = isAuthenticated();
  const [chartExpense, setChartExpense] = useState({
    title: [],
    expense: [],
  });
  const getChartExpense = (userId, token) => {
    getChartExpenses(userId, token)
      .then((res) => {
        setChartExpense({
          ...chartExpense,
          title: res.map((data) => {
            return data.name;
          }),
          expense: res.map((data) => {
            return data.expense;
          }),
        });
      })
      .catch((err) => console.log(err));
  };

  const { title, expense } = chartExpense;
  const data = {
    labels: title,
    datasets: [
      {
        data: expense,
        backgroundColor: [
          '#F4D06F',
          '#FF8811',
          '#9DD9D2',
          '#FFF8F0',
          '#392F5A',
          '#FaD06F',
          '#108811',
          '#cc09D2',
          '#abc8F0',
          '#392b5a',
        ],
      },
    ],
  };
  useEffect(() => {
    getChartExpense(user._id, token);
  }, []);

  return (
    <Pie
      data={data}
      width={400}
      height={400}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default ExpenseChart;
