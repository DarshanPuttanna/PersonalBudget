import React, { useState, useEffect } from 'react';
import moment from 'moment';
import NavigationBar from '../NavigationBar/NavigationBar';
import { getBudgets } from '../../actions/pbCore';
import { isAuthenticated } from '../../actions/auth';
import MonthlyBudgetChart from '../MonthlyBudgetChart/MonthlyBudgetChart';
import './styles.css';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const { user, token } = isAuthenticated();

  const getBudgetsData = (userId, token) => {
    getBudgets(userId, token)
      .then((res) => {
        res;
        setBudgets(res ? res : []);
      })
      .catch((err) => {
        setBudgets({
          error: err,
        });
      });
  };

  useEffect(() => {
    getBudgetsData(user._id, token);
  }, []);

  const budgetsLayout = () => (
    <div className="container">
      <section class="dashboard">
        <div class="side-nav">
          <NavigationBar />
        </div>
        <section class="budget-section">
          <div class="budget-section-heading"></div>
          <div class="total-budget">
            <h1>Budget</h1>
            <div className="chart-content">
              <MonthlyBudgetChart />
            </div>
          </div>

          <div class="budget-table">
            <ul class="responsive-table">
              <li class="table-header">
                {/* <div class="col col-1"> Id</div> */}
                <div class="col col-2"> Name</div>
                <div class="col col-3"> Limit</div>
                <div class="col col-4"> Month</div>
                <div class="col col-5">Remaining</div>
                <div class="col col-6"> Status</div>
              </li>
              {budgets.map((budget, index) => (
                <li class="table-row" key={index}>
                  {/* <div class="col col-1" data-label="Job Id">
                    {budget._id}
                  </div> */}
                  <div class="col col-2" data-label="Customer Name">
                    {budget.name}
                  </div>
                  <div class="col col-3" data-label="Amount">
                    ${budget.budget}
                  </div>
                  <div class="col col-4" data-label="Month">
                    {moment(budget.month).format('MM')}
                  </div>
                  <div class="col col-5" data-label="Remaining">
                    {budget.budget - budget.capacity}
                  </div>
                  <div class="col col-6" data-label="Payment Status">
                    {budget.capacity < budget.budget ? 'Good' : 'Exceeded'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
  return <React.Fragment>{budgetsLayout()}</React.Fragment>;
};

export default Budgets;
