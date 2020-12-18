import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { getExpenseByBudgetTypeChart } from '../../actions/pbCore';
import { isAuthenticated } from '../../actions/auth';

const ExpenseByBudgetTypeChart = () => {
  const { user, token } = isAuthenticated();
  const [chartExpenseBudgetType, setChartExpenseByBudgetType] = useState({
    title: [],
    expenseByBudget: [],
  });

  const getExpenseByBudgetTypeCharts = (userId, token) => {
    getExpenseByBudgetTypeChart(userId, token)
      .then((res) => {
        setChartExpenseByBudgetType({
          ...chartExpenseBudgetType,
          title: res.map((data) => {
            return data.budgetname[0].name;
          }),
          expenseByBudget: res.map((data) => {
            return data.total;
          }),
        });
      })
      .catch((err) => console.log(err));
  };

  const { title, expenseByBudget } = chartExpenseBudgetType;

  const data = {
    labels: title,
    datasets: [
      {
        data: expenseByBudget,
        backgroundColor: [
          '#a3d56c',
          '#57a092',
          '#e32b21',
          '#950231',
          '#119904',
          '#b3056c',
          '#c7cb92',
          '#a62b21',
          '#9ba231',
          '#e1c904',
        ],
      },
    ],
  };
  useEffect(() => {
    getExpenseByBudgetTypeCharts(user._id, token);
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

export default ExpenseByBudgetTypeChart;
