import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import BudgetChart from '../BudgetChart/BudgetChart';
import ExpenseChart from '../ExpenseChart/ExpenseChart';
import BudgetExpenseChart from '../budgetExpenseChart/BudgetExpenseChart';
import ExpenseByBudgetTypeChart from '../expenseByBudgetTypeChart/ExpenseByBudgetTypeChart';
import MonthChart from '../MonthlyBudgetChart/MonthlyBudgetChart';
import MonthlyExpenseChart from '../MonthlyExpensesChart/MonthlyExpenseChart';
import {
  getAllExpenses,
  getBudgets,
  budgetTotal,
  expenseTotal,
  getSomeExpenses,
  getSomeBudgets,
} from '../../actions/pbCore';
import { isAuthenticated } from '../../actions/auth';
import './styles.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  console.log(isAuthenticated());
  const { user, token } = isAuthenticated();
  const getExpenses = (id, token) => {
    getAllExpenses(id, token)
      .then((res) => {
        setExpenses(res);
      })
      .catch((err) => console.log(err));
  };

  const getExpensesData = (userId, token) => {
    getSomeExpenses(userId, token)
      .then((res) => {
        setExpenseData(res);
      })
      .catch((err) => console.log(err));
  };

  const getSomeBudgetData = (userId, token) => {
    getSomeBudgets(userId, token)
      .then((res) => {
        setBudgetData(res);
      })
      .catch((err) => console.log(err));
  };

  const getBudgetsData = (userId, token) => {
    getBudgets(userId, token)
      .then((res) => {
        setBudgets(res);
      })
      .catch((err) => {
        setBudgets({
          error: err,
        });
      });
  };

  const getBudgetTotal = (userId, token) => {
    budgetTotal(userId, token)
      .then((res) => {
        setTotalBudget(res);
      })
      .catch((err) => console.log(err));
  };

  const getExpenseTotal = (userId, token) => {
    expenseTotal(userId, token)
      .then((res) => {
        setTotalExpense(res);
      })
      .catch((err) => console.log(err));
  };

  const number = (totalExpense / totalBudget) * 100;
  const percentage = Math.round((number * 10) / 10);

  useEffect(() => {
    user;
    getExpenses(user._id, token);

    getBudgetsData(user._id, token);
    getBudgetTotal(user._id, token);
    getExpenseTotal(user._id, token);
    getExpensesData(user._id, token);
    getSomeBudgetData(user._id, token);
  }, []);

  const dashboardLayout = () => (
    <div className="container">
      <section class="dashboard">
        <div class="side-nav">
          <NavigationBar />
        </div>
        <div class="dashboard-content">
          <div class="dashboard-heading">
            <h1>Dashboard</h1>
            <p>Welcome {user.name}</p>
          </div>
          <div class="chart-cards">
            <div class="total-budget" id="budget">
              <h1>Budget Charts</h1>
              <div className="chart-content">
                {budgetData.length > 0 ? (
                  <BudgetChart />
                ) : (
                  <div>
                    <h2>No Budget to Display</h2>
                    <h3>Add Budget</h3>
                  </div>
                )}
              </div>
            </div>
            <div class="total-budget" id="expense">
              <h1>Expense Chart</h1>
              <div className="chart-content">
                {budgetData.length > 0 ? (
                  <ExpenseChart />
                ) : (
                  <div>
                    <h2>No Budget/Expense to Display</h2>
                    <h3>Add Budget & Expense</h3>
                  </div>
                )}
              </div>
            </div>
            <div class="total-budget" id="budgetandexpense">
              <h1>Budget and Expenditure</h1>
              <div className="chart-content">
                {budgetData.length > 0 ? (
                  <BudgetExpenseChart />
                ) : (
                  <div>
                    <h2>No Budget/Expense to Display</h2>
                    <h3>Add Budget & Expense</h3>
                  </div>
                )}
              </div>
            </div>
            <div class="total-budget" id="expensebybudgettype">
              <h1>Expense by Budget Type Charts</h1>
              <div className="chart-content">
                {budgetData.length > 0 ? (
                  <ExpenseByBudgetTypeChart />
                ) : (
                  <div>
                    <h2>No Expenses to Display</h2>
                    <h3>Add Expenses</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return <React.Fragment>{dashboardLayout()}</React.Fragment>;
};

export default Dashboard;
