import React, { useState, useEffect } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import { getAllExpenses, deleteExpense } from '../../actions/pbCore';
import { isAuthenticated } from '../../actions/auth';
import MonthlyExpenseChart from '../MonthlyExpensesChart/MonthlyExpenseChart';
import DailyExpenseChart from '../DailyExpenseChart/DailyExpenseChart';
import './styles.css';

const Expenses = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { user, token } = isAuthenticated();

  const getExpenses = (id, token) => {
    getAllExpenses(id, token)
      .then((res) => {
        setExpenses(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getExpenses(user._id, token);
  }, []);

  const getExpensesData = (userId, token) => {
    getSomeExpenses(userId, token)
      .then((res) => {
        setExpenseData(res);
      })
      .catch((err) => console.log(err));
  };

  const expensesLayout = () => (
    <div className="container">
      <section class="dashboard">
        <div class="side-nav">
          <NavigationBar />
        </div>
        <section class="expense-section">
          <div class="expense-section-heading">
            <h1>Expenses</h1>
          </div>
          <div class="expenseCharts">
            <div class="total-budget">
              <h1>Monthly Expense</h1>
              <div className="chart-content">
                <MonthlyExpenseChart />
              </div>
            </div>
            <div class="total-budget">
              <h1>Daily Expense</h1>
              <div className="chart-content">
                <DailyExpenseChart />
              </div>
            </div>
          </div>
          <div class="expense-table">
            <ul class="responsive-table">
              <li class="table-header">
                <div class="col col-1">Expense Name</div>
                <div class="col col-2">Budget Name</div>
                <div class="col col-3"> Limit</div>
                <div class="col col-4">Date</div>
                <div class="col col-5">Delete</div>
              </li>

              {expenses.map((expense, index) => (
                <li class="table-row" key={index}>
                  <div class="col col-1" data-label="Expense Name">
                    {expense.name}
                  </div>
                  <div class="col col-2" data-label="Expense Budget">
                    {expense.budget.name}
                  </div>
                  <div class="col col-3" data-label="Amount">
                    ${expense.expense}
                  </div>
                  <div class="col col-4" data-label="Date">
                    {new Date(expense.datetime).toDateString()}
                  </div>
                  <div
                    class="col col-5"
                    data-label="Payment Status"
                    onClick={() => {
                      deleteExpense(user._id, expense._id, token).then(() => {
                        getExpenses(user._id, token);
                      });
                    }}
                  >
                    <i class="fas fa-times"></i>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
  return <React.Fragment>{expensesLayout()}</React.Fragment>;
};

export default Expenses;
